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
exports.watchFunction = exports.importComponent = exports.normalFunction = exports.computed = exports.reactive = exports.ref = exports.lifecycleFunction = exports.prop = exports.parse = exports.TypeAliasDeclaration = exports.ImportDeclaration = void 0;
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
    const sourceFile = ts.createSourceFile("", str, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TS);
    let vueValiables = [];
    vueValiables = [...sourceFile.getChildren()[0].getChildren()]
        .map(visit)
        .filter((item) => item != null);
    return vueValiables;
}
exports.parse = parse;
function visit(node) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (isFunctionDeclaration(node)) {
        const funcName = (_c = (_b = (_a = node === null || node === void 0 ? void 0 : node.name) === null || _a === void 0 ? void 0 : _a.escapedText) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
        if (lifecycleHooksArray.indexOf(funcName) == -1) {
            return new normalFunction((_f = (_e = (_d = node === null || node === void 0 ? void 0 : node.name) === null || _d === void 0 ? void 0 : _d.escapedText) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : "", "function " +
                node
                    .getChildren()
                    .map((item) => item.getText())
                    .slice(2)
                    .join(""), searchIdentifier(node), node.getStart() +
                ((_j = (_h = (_g = node === null || node === void 0 ? void 0 : node.name) === null || _g === void 0 ? void 0 : _g.escapedText) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : "").length +
                1);
        }
        else {
            return new lifecycleFunction(funcName, "function " +
                node
                    .getChildren()
                    .map((item) => item.getText())
                    .slice(2)
                    .join(""), searchIdentifier(node), node.getStart());
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
                        return new ref(type, name, obj.getText());
                    }
                    break;
                case "prop": {
                    const valueDefined = !!getValueFromStatement(node);
                    return new prop(!valueDefined, type, name, valueDefined ? getValueFromStatement(node) : null);
                    break;
                }
                case "computed":
                    return new computed(type, name, getValueFromStatement(node), searchIdentifier(node), (_k = getNestedChild(node, [0, 1, 0, 4])) === null || _k === void 0 ? void 0 : _k.getStart());
                    break;
                default:
                    throw TypeError("Type is not correct");
            }
        }
        else if (typeNum == 209 || typeNum == 208) {
            return lifecycleHooksArray.indexOf(name) == -1
                ? new normalFunction(name, getNestedChild(node, [0, 1, 0, 2]).getText(), searchIdentifier(node), getNestedChild(node, [0, 1, 0, 2]).getStart())
                : new lifecycleFunction(name, getNestedChild(node, [0, 1, 0, 2]).getText(), searchIdentifier(node), getNestedChild(node, [0, 1, 0, 2]).getStart());
        }
    }
    else if (node.kind == 233) {
        //ExpressionStatement
        const { name, arg1, arg2 } = expParser(node);
        if (name == "importComponent") {
            return new importComponent(arg1, arg2.slice(1, -1));
        }
        else if (name == "watch") {
            return new watchFunction(node.getText(), searchIdentifier((_l = node.getChildAt(0).getChildren()[2]) === null || _l === void 0 ? void 0 : _l.getChildAt(2)), node.getChildAt(0).getStart());
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
    var _a, _b, _c, _d;
    const children = node.getChildAt(0).getChildren();
    return {
        name: children[0].getText(),
        arg1: (_b = (_a = children[2]) === null || _a === void 0 ? void 0 : _a.getChildAt(0)) === null || _b === void 0 ? void 0 : _b.getText(),
        arg2: (_d = (_c = children[2]) === null || _c === void 0 ? void 0 : _c.getChildAt(2)) === null || _d === void 0 ? void 0 : _d.getText(),
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
    constructor(variableName, content, identifier, startPosition) {
        this.variableName = variableName;
        this.content = content;
        this.identifier = identifier;
        this.startPosition = startPosition;
    }
}
exports.lifecycleFunction = lifecycleFunction;
class normalFunction {
    constructor(variableName, content, identifier, startPosition) {
        this.variableName = variableName;
        this.content = content;
        this.identifier = identifier;
        this.startPosition = startPosition;
    }
}
exports.normalFunction = normalFunction;
class computed {
    constructor(type, variableName, content, identifier, startPosition) {
        this.type = type;
        this.variableName = variableName;
        this.content = content;
        this.identifier = identifier;
        this.startPosition = startPosition;
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
class watchFunction {
    constructor(content, identifier, startPosition) {
        this.content = content;
        this.identifier = identifier;
        this.startPosition = startPosition;
        this.content = content;
        this.variableName = "";
    }
}
exports.watchFunction = watchFunction;
function getVariableNameFromFirstStatement(node) {
    return getNestedChild(node, [0, 1, 0, 0]).getText();
}
function getValueFromStatement(node) {
    var _a;
    return (_a = getNestedChild(node, [0, 1, 0, 4])) === null || _a === void 0 ? void 0 : _a.getText();
}
function getNestedChild(node, arr) {
    let tmp = node;
    for (const item of arr) {
        tmp = tmp === null || tmp === void 0 ? void 0 : tmp.getChildAt(item);
    }
    return tmp;
}
function isFunctionDeclaration(node) {
    return node.kind == 251;
}
class Identifiers {
    constructor(start, end, str) {
        this.start = start;
        this.end = end;
        this.str = str;
    }
}
function searchIdentifier(node) {
    if (node.getChildCount() > 0) {
        return node
            .getChildren()
            .map((item) => searchIdentifier(item))
            .reduce((acc, val) => {
            if (val == null) {
                return acc;
            }
            else {
                return acc.concat(val);
            }
        }, []);
    }
    else {
        if (node.kind == 78 /* && node.flags == 67108864 */) {
            return [
                new Identifiers(node.getStart(), node.getEnd(), node.getText()),
            ];
        }
    }
    return null;
}
