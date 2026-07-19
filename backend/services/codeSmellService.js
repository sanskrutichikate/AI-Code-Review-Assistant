const detectCodeSmells = (sourceCode) => {

    const smells = [];

    // Console.log

    if (sourceCode.includes("console.log")) {

        smells.push({
            type: "Console Log",
            severity: "Low",
            message: "Remove console.log before production."
        });

    }

    // var keyword

    if (sourceCode.includes("var ")) {

        smells.push({
            type: "Old JavaScript",
            severity: "Medium",
            message: "Use let or const instead of var."
        });

    }

    // eval

    if (sourceCode.includes("eval(")) {

        smells.push({
            type: "Security",
            severity: "High",
            message: "Avoid using eval()."
        });

    }

    // Long File

    const lines = sourceCode.split("\n");

    if (lines.length > 200) {

        smells.push({
            type: "Long File",
            severity: "Medium",
            message: "Large source file detected."
        });

    }

    // Deep Nesting

    const ifCount =
        (sourceCode.match(/if/g) || []).length;

    if (ifCount > 5) {

        smells.push({
            type: "Deep Nesting",
            severity: "Medium",
            message: "Too many conditional statements."
        });

    }

    return smells;

};

export { detectCodeSmells };