import * as acorn from "acorn";

function analyzeComplexity(code){

    let ast;

    try{

        ast = acorn.parse(code,{
            ecmaVersion:"latest",
            sourceType:"module"
        });

    }
    catch(error){

        return {
            error:"Invalid JavaScript code"
        };

    }



    let functions = 0;
    let classes = 0;
    let complexity = 1;



    function traverse(node){

        if(!node || typeof node !== "object"){
            return;
        }


        if(
            node.type === "FunctionDeclaration" ||
            node.type === "FunctionExpression" ||
            node.type === "ArrowFunctionExpression"
        ){

            functions++;

        }



        if(node.type==="ClassDeclaration"){

            classes++;

        }



        if(
            node.type==="IfStatement" ||
            node.type==="ForStatement" ||
            node.type==="WhileStatement" ||
            node.type==="ConditionalExpression" ||
            node.type==="SwitchCase"
        ){

            complexity++;

        }



        Object.keys(node).forEach(key=>{

            const child=node[key];


            if(Array.isArray(child)){

                child.forEach(item=>traverse(item));

            }

            else if(typeof child==="object" && child!==null){

                traverse(child);

            }


        });


    }



    traverse(ast);



    const linesOfCode =
    code.split("\n").length;



    let level="Low";


    if(complexity>10){

        level="High";

    }
    else if(complexity>5){

        level="Medium";

    }



    return {

        linesOfCode,

        functions,

        classes,

        cyclomaticComplexity:complexity,

        complexityLevel:level

    };


}


export { analyzeComplexity };