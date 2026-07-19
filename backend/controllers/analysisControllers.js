import pool from "../config/db.js";
import { analyzeJavaScript } from "../services/eslintService.js";


// Analyze Code

const analyzeCode = async (req, res) => {

    try {

        const { snippetId, sourceCode } = req.body;

        // Validate input
        if (!snippetId || !sourceCode) {
            return res.status(400).json({
                message: "Snippet ID and source code are required."
            });
        }

        // Run ESLint
        const findings = await analyzeJavaScript(sourceCode);

        // Save findings in database
        for (const finding of findings) {

            await pool.query(
                `
                INSERT INTO analysis_results
                (snippet_id, severity, rule_name, message, line_number, column_number)
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

        res.status(200).json({
            message: "Analysis completed successfully.",
            findings
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};


// Get All Analysis Results


const getAnalysisResults = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT

                ar.id,

                ar.severity,

                ar.rule_name,

                ar.message,

                ar.line_number,

                ar.column_number,

                ar.created_at,

                cs.title,

                cs.language

            FROM analysis_results ar

            JOIN code_snippets cs
            ON ar.snippet_id = cs.id

            ORDER BY ar.created_at DESC
            `
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

export { analyzeCode , getAnalysisResults};