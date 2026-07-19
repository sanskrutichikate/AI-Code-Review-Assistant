// Mock AI Service

const reviewCode = async (sourceCode, language) => {

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    let summary = "";
    let bugs = [];
    let improvements = [];
    let bestPractices = [];
    let security = [];
    let performance = [];

    // Undefined variable
    if (sourceCode.includes("console.log(y)")) {
        bugs.push("Variable 'y' is used before being declared.");
    }

    // ==
    if (sourceCode.includes("==")) {
        improvements.push("Use '===' instead of '==' for strict comparison.");
    }

    // var
    if (sourceCode.includes("var ")) {
        bestPractices.push("Use 'let' or 'const' instead of 'var'.");
    }

    // eval
    if (sourceCode.includes("eval(")) {
        security.push("Avoid using eval() because it can execute malicious code.");
    }

    // Nested loops
    const forCount = (sourceCode.match(/for/g) || []).length;

    if (forCount > 1) {
        performance.push(
            "Nested loops may reduce performance for large datasets."
        );
    }

    if (
        bugs.length === 0 &&
        improvements.length === 0 &&
        bestPractices.length === 0 &&
        security.length === 0 &&
        performance.length === 0
    ) {
        summary =
            "Your code looks clean and follows good programming practices.";
    } else {
        summary =
            "The AI found some issues and suggestions to improve your code.";
    }

    return {
        summary,
        bugs,
        improvements,
        bestPractices,
        security,
        performance
    };

};

export { reviewCode };