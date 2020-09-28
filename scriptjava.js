const { transformSync } = require('@babel/core');
const BabelNodes = require('@babel/types');

function compile(code) {
    return transformSync(
        code,
        {
            plugins: [
                function () {
                    return {
                        visitor: {
                            ArrayExpression(path) {
                                path.node.elements = path.node.elements.reverse();
                            },
                            ArrowFunctionExpression(path) {
                                path.node.params = path.node.params.reverse();
                                path.node.async = !path.node.async;
                                path.node.generator = !path.node.generator;
                            },
                            AssignmentExpression(path) {
                                [
                                    path.node.left,
                                    path.node.right
                                ] = [
                                    path.node.right,
                                    path.node.left
                                ]
                            },
                            BinaryExpression(path) {
                                [
                                    path.node.left,
                                    path.node.right
                                ] = [
                                    path.node.right,
                                    path.node.left
                                ]
                            },
                            BlockStatement(path) {
                                path.node.body = path.node.body.reverse();
                            },
                            BooleanLiteral(path) {
                                path.node.value = !path.node.value;
                            },
                            CallExpression(path) {
                                if (path.node.arguments.length > 0) {
                                    [
                                        path.node.callee,
                                        path.node.arguments[0]
                                    ] = [
                                        path.node.arguments[0],
                                        path.node.callee
                                    ]
                                }
                            },
                            ConditionalExpression(path) {
                                [
                                    path.node.consequent,
                                    path.node.alternate
                                ] = [
                                    path.node.alternate,
                                    path.node.consequent
                                ]
                            },
                            ForInStatement(path) {
                                [
                                    path.node.left,
                                    path.node.right
                                ] = [
                                    path.node.right,
                                    path.node.left
                                ]
                            },
                            ForOfStatement(path) {
                                [
                                    path.node.left,
                                    path.node.right
                                ] = [
                                    path.node.right,
                                    path.node.left
                                ]
                            },
                            ForStatement(path) {
                                [
                                    path.node.init,
                                    path.node.test,
                                    path.node.update
                                ] = [
                                    path.node.update,
                                    path.node.test,
                                    path.node.init
                                ]
                            },
                            FunctionDeclaration(path) {
                                path.node.params = path.node.params.reverse();
                                path.node.async = !path.node.async;
                                path.node.generator = !path.node.generator;
                            },
                            FunctionExpression(path) {
                                path.node.params = path.node.params.reverse();
                                path.node.async = !path.node.async;
                                path.node.generator = !path.node.generator;
                            },
                            IfStatement(path) {
                                [
                                    path.node.consequent,
                                    path.node.alternate
                                ] = [
                                    path.node.alternate ?? BabelNodes.blockStatement([]),
                                    path.node.consequent
                                ]
                            },
                            LogicalExpression(path) {
                                [
                                    path.node.left,
                                    path.node.right
                                ] = [
                                    path.node.right,
                                    path.node.left
                                ]
                            },
                            MemberExpression(path) {
                                [
                                    path.node.object,
                                    path.node.property
                                ] = [
                                    path.node.property,
                                    path.node.object
                                ]
                            },
                            NewExpression(path) {
                                if (path.node.arguments.length > 0) {
                                    [
                                        path.node.callee,
                                        path.node.arguments[0]
                                    ] = [
                                        path.node.arguments[0],
                                        path.node.callee
                                    ]
                                }
                            },
                            ObjectProperty(path) {
                                [
                                    path.node.key,
                                    path.node.value
                                ] = [
                                    path.node.value,
                                    path.node.key
                                ]
                            },
                            StringLiteral(path) {
                                path.node.value = path.node.value.split("").reverse().join("");
                            }
                        }
                    }
                }
            ]
        }
    ).code;
}

module.exports = compile;
