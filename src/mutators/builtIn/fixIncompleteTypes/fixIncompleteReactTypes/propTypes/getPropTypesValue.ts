import * as tsutils from "tsutils";
import * as ts from "typescript";

import { FileMutationsRequest } from "../../../../fileMutator";

type PropTypesMember = ts.PropertyDeclaration & {
    initializer: ts.ObjectLiteralExpression;
    name: {
        kind: ts.SyntaxKind.Identifier;
        text: "propTypes";
    };
};

/**
 * @returns Whether a node is a `propTypes` class member with an object literal value.
 */
const getStaticPropTypes = (node: ts.ClassElement): node is PropTypesMember =>
    ts.isPropertyDeclaration(node) &&
    tsutils.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword) &&
    ts.isIdentifier(node.name) &&
    node.name.text === "propTypes" &&
    node.initializer !== undefined &&
    ts.isObjectLiteralExpression(node.initializer);

/**
 * @returns Object literal `propTypes` assigned to the class, if it exists in a sibling property setter.
 */
const getPropTypesStatement = (node: ts.Node, className: string) => {
    if (!ts.isExpressionStatement(node) || !ts.isBinaryExpression(node.expression)) {
        return undefined;
    }

    const { left, right } = node.expression;
    if (
        !ts.isPropertyAccessExpression(left) ||
        !ts.isIdentifier(left.expression) ||
        left.expression.text !== className ||
        !ts.isIdentifier(left.name) ||
        left.name.text !== "propTypes" ||
        !ts.isObjectLiteralExpression(right)
    ) {
        return undefined;
    }

    return right;
};

/**
 * Finds the equivalent `propTypes` object literal for a class, if it exists.
 *
 * @todo
 * This assumes an object literal (`{ ... }`) with all inline members.
 * It doesn't yet handle shared variable references or `...` spread operations.
 */
export const getPropTypesValue = (node: ts.ClassDeclaration, request: FileMutationsRequest): ts.ObjectLiteralExpression | undefined => {
    // If the class' parent declares a prop types for it, use it
    if (node.name !== undefined) {
        for (const sibling of node.parent.getChildren(request.sourceFile)) {
            const propTypesStatement = getPropTypesStatement(sibling, node.name.text);

            if (propTypesStatement !== undefined) {
                return propTypesStatement;
            }
        }
    }

    // If the class declares its own static prop types, use it
    const staticPropTypes = node.members.find(getStaticPropTypes);
    if (staticPropTypes !== undefined) {
        return staticPropTypes.initializer;
    }

    // Since none of the above worked out, assume no prop types are declared
    return undefined;
};
