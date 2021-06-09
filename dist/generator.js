"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVueTemplate = void 0;
const parser_1 = require("./parser");
class generateVueTemplate {
    constructor(parsedtmp) {
        this.other = parsedtmp
            .filter((item) => item instanceof parser_1.TypeAliasDeclaration)
            .map((item) => item.typeDefText);
        this.imports = parsedtmp
            .filter((item) => item instanceof parser_1.ImportDeclaration)
            .map((item) => item.importText);
        this.parsed = parsedtmp.filter((item) => typeof item !== "string");
    }
    generate() {
        let genCode = "";
        genCode += this.generateImport();
        this.importComponents().forEach((item) => {
            genCode += `import ${item.variableName} from ${item.path};`;
        });
        genCode += this.imports.join("\n");
        genCode += `export default defineComponent({`;
        if (this.isUsingProp()) {
            genCode += "props: {";
            this.parsed
                .filter((item) => item instanceof parser_1.prop)
                .forEach(function (item) {
                const _item = item;
                genCode += `${_item.variableName}: {type: ${_item.type.charAt(0).toUpperCase() + _item.type.slice(1)},required: ${_item.isRequired},${_item.isRequired ? "" : "default:" + _item.content}},`;
            });
            genCode += "},";
        }
        if (this.importComponents().length > 0) {
            genCode += `components: {${this.importComponents()
                .map((item) => item.variableName)
                .join()}},`;
        }
        genCode += `setup(${this.isUsingProp() ? "props" : ""}) {${this.isUsingProp()
            ? "const {" +
                this.parsed
                    .filter((item) => item instanceof parser_1.prop)
                    .map((item) => item.variableName)
                    .join() +
                "} = toRefs(props);"
            : ""}`;
        genCode += this.other.join("");
        this.refs().forEach((item) => (genCode += `const ${item.variableName} = ref<${item.type}>(${item.content});`));
        this.reactives().forEach((item) => (genCode += `const ${item.variableName} = reactive<${item.type}>(${item.content});`));
        this.normalFuncs().forEach(function (item) {
            genCode += `const ${item.variableName} = ${this.addDotValueToRefVariable(item.identifier, item.content, item.startPosition)};`;
        }, this);
        this.lifecycleFuncs().forEach(function (item) {
            genCode += `${item.variableName}(${this.addDotValueToRefVariable(item.identifier, item.content, item.startPosition)});`;
        }, this);
        this.computedFuncs().forEach(function (item) {
            genCode += `const ${item.variableName} = computed(${this.addDotValueToRefVariable(item.identifier, item.content, item.startPosition)});`;
        }, this);
        genCode += `return{${this.returnVals().join()}}`;
        genCode += "},});";
        return genCode;
    }
    generateImport() {
        const imports = ["defineComponent"];
        if (this.isUsingProp()) {
            imports.push("toRefs");
        }
        if (this.isUsingRef()) {
            imports.push("ref");
        }
        if (this.isUsingReative()) {
            imports.push("reactive");
        }
        if (this.isUsingComputed()) {
            imports.push("computed");
        }
        if (this.usedLifecycleFuncs().length > 0) {
            imports.push(...this.usedLifecycleFuncs());
        }
        return `import {${imports.join()}} from 'vue';`;
    }
    isUsingProp() {
        return this.parsed.filter((item) => item instanceof parser_1.prop).length > 0;
    }
    isUsingRef() {
        return this.parsed.filter((item) => item instanceof parser_1.ref).length > 0;
    }
    refs() {
        return this.parsed.filter((item) => item instanceof parser_1.ref);
    }
    isUsingReative() {
        return (this.parsed.filter((item) => item instanceof parser_1.reactive).length > 0);
    }
    reactives() {
        return this.parsed.filter((item) => item instanceof parser_1.reactive);
    }
    isUsingComputed() {
        return (this.parsed.filter((item) => item instanceof parser_1.computed).length > 0);
    }
    computedFuncs() {
        return this.parsed.filter((item) => item instanceof parser_1.computed);
    }
    normalFuncs() {
        return this.parsed.filter((item) => item instanceof parser_1.normalFunction);
    }
    usedLifecycleFuncs() {
        return [
            ...new Set(this.parsed
                .filter((item) => item.variableName &&
                item instanceof parser_1.lifecycleFunction)
                .map((item) => item.variableName)),
        ];
    }
    lifecycleFuncs() {
        return this.parsed.filter((item) => item instanceof parser_1.lifecycleFunction);
    }
    importComponents() {
        return this.parsed.filter((item) => item instanceof parser_1.importComponent);
    }
    returnVals() {
        return this.parsed
            .filter((item) => !(item instanceof parser_1.prop ||
            item instanceof parser_1.lifecycleFunction ||
            item instanceof parser_1.importComponent ||
            item instanceof parser_1.ImportDeclaration ||
            item instanceof parser_1.TypeAliasDeclaration))
            .map((item) => item === null || item === void 0 ? void 0 : item.variableName);
    }
    addDotValueToRefVariable(identifiers, str, startPosition) {
        identifiers === null || identifiers === void 0 ? void 0 : identifiers.forEach((item) => {
            if (this.refs()
                .map((seconditem) => seconditem.variableName)
                .indexOf(item.str) != -1) {
                str = this.replaceBetween(str, item.start - startPosition, item.end - startPosition, item.str + ".value");
                startPosition -= 6;
            }
        });
        return str;
    }
    replaceBetween(target, start, end, what) {
        return target.substring(0, start) + what + target.substring(end);
    }
}
exports.generateVueTemplate = generateVueTemplate;
class Identifiers {
    constructor(start, end, str) {
        this.start = start;
        this.end = end;
        this.str = str;
    }
}
