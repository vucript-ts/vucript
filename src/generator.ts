import {
    VueVariable,
    prop,
    lifecycleFunction,
    ref,
    computed,
    reactive,
    normalFunction,
    importComponent,
    parsedContentType,
    ImportDeclaration,
    TypeAliasDeclaration,
    watchFunction,
} from "./parser";
export class generateVueTemplate {
    parsed: VueVariable[];
    other: string[];
    imports: string[];
    constructor(parsedtmp: parsedContentType[]) {
        this.other = parsedtmp
            .filter<TypeAliasDeclaration>(
                (item): item is TypeAliasDeclaration =>
                    item instanceof TypeAliasDeclaration
            )
            .map((item) => item.typeDefText);
        this.imports = parsedtmp
            .filter<ImportDeclaration>(
                (item): item is ImportDeclaration =>
                    item instanceof ImportDeclaration
            )
            .map((item) => item.importText);
        this.parsed = parsedtmp.filter<VueVariable>(
            (item): item is VueVariable => typeof item !== "string"
        );
    }
    generate(): string {
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
                .filter((item) => item instanceof prop)
                .forEach(function (item) {
                    const _item = <prop>item;
                    genCode += `${_item.variableName}: {type: ${
                        _item.type.charAt(0).toUpperCase() + _item.type.slice(1)
                    },required: ${_item.isRequired},${
                        _item.isRequired ? "" : "default:" + _item.content
                    }},`;
                });
            genCode += "},";
        }
        if (this.importComponents().length > 0) {
            genCode += `components: {${this.importComponents()
                .map((item) => item.variableName)
                .join()}},`;
        }
        genCode += `setup(${this.isUsingProp() ? "props" : ""}) {${
            this.isUsingProp()
                ? "const {" +
                  this.parsed
                      .filter<prop>(
                          (item): item is prop => item instanceof prop
                      )
                      .map((item) => item.variableName)
                      .join() +
                  "} = toRefs(props);"
                : ""
        }`;
        genCode += this.other.join("");
        this.refs().forEach(
            (item) =>
                (genCode += `const ${item.variableName} = ref<${item.type}>(${item.content});`)
        );
        this.reactives().forEach(
            (item) =>
                (genCode += `const ${item.variableName} = reactive<${item.type}>(${item.content});`)
        );
        this.normalFuncs().forEach(function (this: generateVueTemplate, item) {
            genCode += `const ${
                item.variableName
            } = ${this.addDotValueToRefVariable(
                item.identifier,
                item.content,
                item.startPosition
            )};`;
        }, this);
        this.lifecycleFuncs().forEach(function (
            this: generateVueTemplate,
            item
        ) {
            genCode += `${item.variableName}(${this.addDotValueToRefVariable(
                item.identifier,
                item.content,
                item.startPosition
            )});`;
        },
        this);
        this.computedFuncs().forEach(function (
            this: generateVueTemplate,
            item
        ) {
            genCode += `const ${
                item.variableName
            } = computed(${this.addDotValueToRefVariable(
                item.identifier,
                item.content,
                item.startPosition
            )});`;
        },
        <generateVueTemplate>this);
        this.watchFuncs().forEach(function (this: generateVueTemplate, item) {
            if (item.stopFuncName != null) {
                genCode += `const ${item.stopFuncName}=`;
            }
            genCode += `${this.addDotValueToRefVariable(
                item.identifier,
                item.content,
                item.startPosition
            )};`;
        }, <generateVueTemplate>this);
        genCode += `return{${this.returnVals().join()}}`;
        genCode += "},});";
        return genCode;
    }
    private generateImport(): string {
        const imports: string[] = ["defineComponent"];
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
        if (this.isUsingWatch()) {
            imports.push("watch");
        }
        if (this.usedLifecycleFuncs().length > 0) {
            imports.push(...this.usedLifecycleFuncs());
        }
        return `import {${imports.join()}} from 'vue';`;
    }
    private isUsingProp(): boolean {
        return this.parsed.filter((item) => item instanceof prop).length > 0;
    }
    private isUsingRef(): boolean {
        return this.parsed.filter((item) => item instanceof ref).length > 0;
    }
    private refs(): ref[] {
        return this.parsed.filter((item) => item instanceof ref) as ref[];
    }
    private isUsingReative(): boolean {
        return (
            this.parsed.filter((item) => item instanceof reactive).length > 0
        );
    }
    private reactives(): reactive[] {
        return this.parsed.filter(
            (item) => item instanceof reactive
        ) as reactive[];
    }
    private isUsingComputed(): boolean {
        return (
            this.parsed.filter((item) => item instanceof computed).length > 0
        );
    }
    private isUsingWatch(): boolean {
        return (
            this.parsed.filter((item) => item instanceof watchFunction).length >
            0
        );
    }
    private computedFuncs(): computed[] {
        return this.parsed.filter(
            (item) => item instanceof computed
        ) as computed[];
    }
    private normalFuncs(): normalFunction[] {
        return this.parsed.filter(
            (item) => item instanceof normalFunction
        ) as normalFunction[];
    }
    private watchFuncs(): watchFunction[] {
        return this.parsed.filter(
            (item) => item instanceof watchFunction
        ) as watchFunction[];
    }
    private usedLifecycleFuncs(): string[] {
        return [
            ...new Set(
                this.parsed
                    .filter(
                        (item) =>
                            item.variableName &&
                            item instanceof lifecycleFunction
                    )
                    .map((item) => item.variableName)
            ),
        ] as string[];
    }
    private lifecycleFuncs(): lifecycleFunction[] {
        return this.parsed.filter(
            (item) => item instanceof lifecycleFunction
        ) as lifecycleFunction[];
    }
    private importComponents(): importComponent[] {
        return this.parsed.filter(
            (item) => item instanceof importComponent
        ) as importComponent[];
    }
    private returnVals(): string[] {
        return [
            ...this.parsed
                .filter(
                    (item) =>
                        !(
                            item instanceof prop ||
                            item instanceof lifecycleFunction ||
                            item instanceof importComponent ||
                            item instanceof ImportDeclaration ||
                            item instanceof watchFunction ||
                            item instanceof TypeAliasDeclaration
                        )
                )
                .map((item) => item?.variableName),
            ...this.watchStopHandlers(),
        ];
    }
    private watchStopHandlers(): string[] {
        return this.watchFuncs()
            .map((item) => item.stopFuncName)
            .filter<string>((item): item is string => item != null);
    }
    private addDotValueToRefVariable(
        identifiers: Identifiers[] | null,
        str: string,
        startPosition: number
    ): string {
        identifiers?.forEach((item) => {
            if (
                this.refs()
                    .map((seconditem) => seconditem.variableName)
                    .indexOf(item.str) != -1
            ) {
                str = this.replaceBetween(
                    str,
                    item.start - startPosition,
                    item.end - startPosition,
                    item.str + ".value"
                );
                startPosition -= 6;
            }
        });
        return str;
    }

    private replaceBetween(
        target: string,
        start: number,
        end: number,
        what: string
    ) {
        return target.substring(0, start) + what + target.substring(end);
    }
}

class Identifiers {
    constructor(public start: number, public end: number, public str: string) {}
}
