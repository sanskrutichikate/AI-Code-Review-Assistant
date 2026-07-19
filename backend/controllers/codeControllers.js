import pool from "../config/db.js";
import { analyzeJavaScript } from "../services/eslintService.js";
import { analyzeComplexity } from "../services/complexityService.js";
import { detectCodeSmells } from "../services/codeSmellService.js";
import { generateDocumentation } from "../services/documentationService.js";



// Save Code Snippet


const saveCode = async (req, res) => {

    try {

        const { title, language, sourceCode } = req.body;

        const userId = req.user.id;

        // Validation
        if (!title || !language || !sourceCode) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        // Save code snippet
        const result = await pool.query(
            `
            INSERT INTO code_snippets
            (user_id, title, language, source_code)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `,
            [
                userId,
                title,
                language,
                sourceCode
            ]
        );

        // Get inserted snippet
        const snippet = result.rows[0];

        const snippetId = snippet.id;

        // Run ESLint
        let findings = [];

        if (language === "JavaScript") {
            findings = await analyzeJavaScript(sourceCode);
            console.log("ESLint Findings:", findings);
        } else {
            console.log(`${language} selected - skipping ESLint.`);
        }
        let complexity = null;
        let codeSmells = [];
        let documentation = null;

        if (language === "JavaScript") {
            complexity = analyzeComplexity(sourceCode);
            codeSmells = detectCodeSmells(sourceCode);
            documentation = generateDocumentation(sourceCode);
        }

        await pool.query(
            `
INSERT INTO review_results
(
    snippet_id,
    complexity,
    code_smells,
    documentation
)

VALUES ($1,$2,$3,$4)
`,
            [
                snippetId,

                JSON.stringify(complexity),

                JSON.stringify(codeSmells),

                JSON.stringify(documentation)
            ]
        );

        // Save analysis results
        for (const finding of findings) {

            await pool.query(
                `
                INSERT INTO analysis_results
                (
                    snippet_id,
                    severity,
                    rule_name,
                    message,
                    line_number,
                    column_number
                )

                VALUES ($1,$2,$3,$4,$5,$6)
                `,
                [
                    snippetId,
                    finding.severity,
                    finding.rule,
                    finding.message,
                    finding.line,
                    finding.column
                ]
            );

        }

        // Response
        res.status(201).json({
            message: "Code submitted successfully.",

            snippet: result.rows[0],

            findings,

            complexity,

            codeSmells,

            documentation

        });
    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

export { saveCode };