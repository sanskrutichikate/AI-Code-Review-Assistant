import { ESLint } from "eslint";

const analyzeJavaScript = async (sourceCode) => {

    const eslint = new ESLint();

    const results = await eslint.lintText(sourceCode);

    console.log("ESLint Results:");
    console.dir(results, { depth: null });

    const findings = results[0].messages.map((message) => ({
        severity: message.severity === 2 ? "Error" : "Warning",
        rule: message.ruleId,
        message: message.message,
        line: message.line,
        column: message.column,
    }));

    return findings;
};

export { analyzeJavaScript };