import * as ts from "typescript";

export class ImportDeclaration {
    constructor(public importText: string) {}
}
export class TypeAliasDeclaration {
    constructor(public typeDefText: string) {}
}

export type parsedContentType =
    | VueVariable
    | ImportDeclaration
    | TypeAliasDeclaration;

function parse(str: string): parsedContentType[] {
    const sourceFile = ts.createSourceFile(
        "",
        str,
        ts.ScriptTarget.ES2019,
        true,
        ts.ScriptKind.TS
    );
    let vueValiables: parsedContentType[] = [];
    vueValiables = [...sourceFile.getChildren()[0].getChildren()]
        .map(visit)
        .filter<parsedContentType>(
            (item): item is parsedContentType => item != null
        );
    return vueValiables;
}

function visit(node: ts.Node): parsedContentType | undefined {
    if (isFunctionDeclaration(node)) {
        const funcName = node?.name?.escapedText?.toString() ?? "";
        if (lifecycleHooksArray.indexOf(funcName) == -1) {
            return new normalFunction(
                node?.name?.escapedText?.toString() ?? "",
                "function " +
                    (<ts.FunctionDeclaration>node)
                        .getChildren()
                        .map((item) => item.getText())
                        .slice(2)
                        .join(""),
                searchIdentifier(node),
                node.getStart() +
                    (node?.name?.escapedText?.toString() ?? "").length +
                    1
            );
        } else {
            return new lifecycleFunction(
                funcName,
                "function " +
                    (<ts.FunctionDeclaration>node)
                        .getChildren()
                        .map((item) => item.getText())
                        .slice(2)
                        .join(""),
                searchIdentifier(node),
                node.getStart()
            );
        }
    } else if (node.kind == 232) {
        //FirstStatement
        const name = getVariableNameFromFirstStatement(node);
        const typeNum = getNestedChild(node, [0, 1, 0, 2]).kind;
        if (typeNum == 173) {
            const type = getNestedChild(node, [0, 1, 0, 2, 2]).getText();
            switch (getNestedChild(node, [0, 1, 0, 2, 0]).getText()) {
                case "reactive":
                    {
                        const obj = getNestedChild(node, [0, 1, 0, 4]);
                        if (isObject(obj)) {
                            return new reactive(type, name, obj.getText());
                        } else {
                            return new ref(type, name, obj.getText());
                        }
                    }
                    break;
                case "prop": {
                    const valueDefined = !!getValueFromStatement(node);
                    return new prop(
                        !valueDefined,
                        type,
                        name,
                        valueDefined ? getValueFromStatement(node) : null
                    );
                    break;
                }
                case "computed":
                    return new computed(
                        type,
                        name,
                        getValueFromStatement(node),
                        searchIdentifier(node),
                        getNestedChild(node, [0, 1, 0, 4])?.getStart()
                    );
                    break;
                default:
                    throw TypeError("Type is not correct");
            }
        } else if (typeNum == 209 || typeNum == 208) {
            return lifecycleHooksArray.indexOf(name) == -1
                ? new normalFunction(
                      name,
                      getNestedChild(node, [0, 1, 0, 2]).getText(),
                      searchIdentifier(node),
                      getNestedChild(node, [0, 1, 0, 2]).getStart()
                  )
                : new lifecycleFunction(
                      name,
                      getNestedChild(node, [0, 1, 0, 2]).getText(),
                      searchIdentifier(node),
                      getNestedChild(node, [0, 1, 0, 2]).getStart()
                  );
        }
    } else if (node.kind == 233) {
        //ExpressionStatement
        const { name, arg1, arg2 } = expParser(node);
        if (name == "importComponent") {
            return new importComponent(arg1, arg2.slice(1, -1));
        } else {
            return undefined;
        }
    } else if (node.kind == 254) {
        //TypeAliasDeclaration
        return new TypeAliasDeclaration(node.getText());
    } else if (ts.SyntaxKind[node.kind] == "ImportDeclaration") {
        if (!node.getText().toLowerCase().includes("vucript")) {
            return new ImportDeclaration(node.getText());
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}

function expParser(node: ts.Node) {
    const children = node.getChildAt(0).getChildren();
    return {
        name: (children[0] as ts.Identifier).getText(),
        arg1: children[2]?.getChildAt(0)?.getText(),
        arg2: children[2]?.getChildAt(2)?.getText(),
    };
}

const lifecycleHooksArray = [
    "onBeforeMount",
    "onMounted",
    "onBeforeUpdate",
    "onUpdated",
    "onBeforeUnmount",
    "onUnmounted",
    "onErrorCaptured",
    "onRenderTracked",
    "onRenderTriggered",
];

type lifecycleHooksArrayType = typeof lifecycleHooksArray[number];

export { parse };

interface VueVariable {
    type?: string;
    variableName: string;
    content: string | null;
}

class lifecycleFunction implements VueVariable {
    constructor(
        readonly variableName: lifecycleHooksArrayType,
        readonly content: string,
        readonly identifier: Identifiers[] | null,
        readonly startPosition: number
    ) {}
}
class normalFunction implements VueVariable {
    constructor(
        readonly variableName: string,
        readonly content: string,
        readonly identifier: Identifiers[] | null,
        readonly startPosition: number
    ) {}
}
class computed implements VueVariable {
    constructor(
        readonly type: string,
        readonly variableName: string,
        readonly content: string,
        readonly identifier: Identifiers[] | null,
        readonly startPosition: number
    ) {}
}
class ref implements VueVariable {
    constructor(
        readonly type: string,
        readonly variableName: string,
        readonly content: string
    ) {}
}
class reactive implements VueVariable {
    constructor(
        readonly type: string,
        readonly variableName: string,
        readonly content: string
    ) {}
}
class prop implements VueVariable {
    constructor(
        readonly isRequired: boolean,
        readonly type: string,
        readonly variableName: string,
        readonly content: string | null
    ) {}
}

class importComponent implements VueVariable {
    type?: string;
    content: null;
    constructor(readonly path: string, readonly variableName: string) {
        this.path = path;
        this.content = null;
    }
}

function isObject(val: ts.Node) {
    if (val.kind == 200) {
        return true;
    }
    return false;
}

function getVariableNameFromFirstStatement(node: ts.Node) {
    return getNestedChild(node, [0, 1, 0, 0]).getText();
}

function getValueFromStatement(node: ts.Node) {
    return getNestedChild(node, [0, 1, 0, 4])?.getText();
}

function getNestedChild(node: ts.Node, arr: number[]) {
    let tmp = node;
    for (const item of arr) {
        tmp = tmp?.getChildAt(item);
    }
    return tmp;
}

function isFunctionDeclaration(node: ts.Node): node is ts.FunctionDeclaration {
    return node.kind == 251;
}

export {
    VueVariable,
    prop,
    lifecycleFunction,
    ref,
    reactive,
    computed,
    normalFunction,
    importComponent,
};
class Identifiers {
    constructor(public start: number, public end: number, public str: string) {}
}

function searchIdentifier(node: ts.Node): Identifiers[] | null {
    if (node.getChildCount() > 0) {
        return node
            .getChildren()
            .map((item) => searchIdentifier(item))
            .reduce((acc: Identifiers[], val) => {
                if (val == null) {
                    return acc;
                } else {
                    return acc.concat(val);
                }
            }, []);
    } else {
        if (node.kind == 78 /* && node.flags == 67108864 */) {
            return [
                new Identifiers(node.getStart(), node.getEnd(), node.getText()),
            ];
        }
    }
    return null;
}
