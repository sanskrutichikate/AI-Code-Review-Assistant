import * as acorn from "acorn";

function generateDocumentation(code) {

    let ast;

    try {

        ast = acorn.parse(code, {
            ecmaVersion: "latest",
            sourceType: "module"
        });

    } catch (error) {

        return {
            error: "Invalid JavaScript"
        };

    }

    const documentation = {
        functions: [],
        classes: [],
        apis: []
    };

    function traverse(node) {

        if (!node || typeof node !== "object")
            return;

        // Function
        if (node.type === "FunctionDeclaration") {

            documentation.functions.push({

                name: node.id?.name || "Anonymous",

                parameters:
                    node.params.map(param => param.name),

                description:
                    `Function ${node.id?.name}()`

            });

        }

        // Class
        if (node.type === "ClassDeclaration") {

            const methods = [];

            node.body.body.forEach(method => {

                methods.push({

                    name: method.key.name,

                    parameters:
                        method.value.params.map(
                            p => p.name
                        )

                });

            });

            documentation.classes.push({

                name: node.id.name,

                methods

            });

        }

        for (const key in node) {

            const child = node[key];

            if (Array.isArray(child)) {

                child.forEach(traverse);

            } else if (
                child &&
                typeof child === "object"
            ) {

                traverse(child);

            }

        }

    }

    traverse(ast);

    const apiRegex =
        /app\.(get|post|put|delete)\s*\(\s*['"`](.*?)['"`]/g;

    let match;

    while ((match = apiRegex.exec(code)) !== null) {

        documentation.apis.push({

            method: match[1].toUpperCase(),

            route: match[2]

        });

    }

    return documentation;

}

export { generateDocumentation };