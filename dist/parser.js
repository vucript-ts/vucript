"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importComponent = exports.normalFunction = exports.computed = exports.reactive = exports.ref = exports.lifecycleFunction = exports.prop = exports.parse = exports.TypeAliasDeclaration = exports.ImportDeclaration = void 0;
const ts = __importStar(require("typescript"));
class ImportDeclaration {
    constructor(importText) {
        this.importText = importText;
    }
}
exports.ImportDeclaration = ImportDeclaration;
class TypeAliasDeclaration {
    constructor(typeDefText) {
        this.typeDefText = typeDefText;
    }
}
exports.TypeAliasDeclaration = TypeAliasDeclaration;
function parse(str) {
    const sourceFile = ts.createSourceFile("", str, ts.ScriptTarget.Latest, true);
    let vueValiables = [];
    vueValiables = [...sourceFile.getChildren()[0].getChildren()]
        .map(visit)
        .filter((item) => item != null);
    return vueValiables;
}
exports.parse = parse;
function visit(node) {
    if (isFunctionDeclaration(node)) {
        const funcName = node?.name?.escapedText?.toString() ?? "";
        if (lifecycleHooksArray.indexOf(funcName) == -1) {
            return new normalFunction(node?.name?.escapedText?.toString() ?? "", "function " +
                node
                    .getChildren()
                    .map((item) => item.getText())
                    .slice(2)
                    .join(""));
        }
        else {
            return new lifecycleFunction(funcName, "function " +
                node
                    .getChildren()
                    .map((item) => item.getText())
                    .slice(2)
                    .join(""));
        }
    }
    else if (node.kind == 232) {
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
                        }
                        else {
                            return new ref(type, name, obj.getText());
                        }
                    }
                    break;
                case "prop": {
                    const valueDefined = !!getValueFromStatement(node);
                    return new prop(!valueDefined, type, name, valueDefined ? getValueFromStatement(node) : null);
                    break;
                }
                case "computed":
                    return new computed(type, name, getValueFromStatement(node));
                    break;
                default:
                    throw TypeError("Type is not correct");
            }
        }
        else if (typeNum == 209 || typeNum == 208) {
            return lifecycleHooksArray.indexOf(name) == -1
                ? new normalFunction(name, getNestedChild(node, [0, 1, 0, 2]).getText())
                : new lifecycleFunction(name, getNestedChild(node, [0, 1, 0, 2]).getText());
        }
    }
    else if (node.kind == 233) {
        //ExpressionStatement
        const { name, arg1, arg2 } = expParser(node);
        if (name == "importComponent") {
            return new importComponent(arg1, arg2.slice(1, -1));
        }
        else {
            return undefined;
        }
    }
    else if (node.kind == 254) {
        //TypeAliasDeclaration
        return new TypeAliasDeclaration(node.getText());
    }
    else if (ts.SyntaxKind[node.kind] == "ImportDeclaration") {
        if (!node.getText().toLowerCase().includes("vucript")) {
            return new ImportDeclaration(node.getText());
        }
        else {
            return undefined;
        }
    }
    else {
        return undefined;
    }
}
function expParser(node) {
    const children = node.getChildAt(0).getChildren();
    return {
        name: children[0].getText(),
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
class lifecycleFunction {
    constructor(variableName, content) {
        this.variableName = variableName;
        this.content = content;
    }
}
exports.lifecycleFunction = lifecycleFunction;
class normalFunction {
    constructor(variableName, content) {
        this.variableName = variableName;
        this.content = content;
    }
}
exports.normalFunction = normalFunction;
class computed {
    constructor(type, variableName, content) {
        this.type = type;
        this.variableName = variableName;
        this.content = content;
    }
}
exports.computed = computed;
class ref {
    constructor(type, variableName, content) {
        this.type = type;
        this.variableName = variableName;
        this.content = content;
    }
}
exports.ref = ref;
class reactive {
    constructor(type, variableName, content) {
        this.type = type;
        this.variableName = variableName;
        this.content = content;
    }
}
exports.reactive = reactive;
class prop {
    constructor(isRequired, type, variableName, content) {
        this.isRequired = isRequired;
        this.type = type;
        this.variableName = variableName;
        this.content = content;
    }
}
exports.prop = prop;
class importComponent {
    constructor(path, variableName) {
        this.path = path;
        this.variableName = variableName;
        this.path = path;
        this.content = null;
    }
}
exports.importComponent = importComponent;
function isObject(val) {
    if (val.kind == 200) {
        return true;
    }
    return false;
}
function getVariableNameFromFirstStatement(node) {
    return getNestedChild(node, [0, 1, 0, 0]).getText();
}
function getValueFromStatement(node) {
    return getNestedChild(node, [0, 1, 0, 4])?.getText();
}
function getNestedChild(node, arr) {
    let tmp = node;
    for (const item of arr) {
        tmp = tmp?.getChildAt(item);
    }
    return tmp;
}
function isFunctionDeclaration(node) {
    return node.kind == 251;
}
