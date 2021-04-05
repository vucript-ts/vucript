export declare class ImportDeclaration {
    importText: string;
    constructor(importText: string);
}
export declare class TypeAliasDeclaration {
    typeDefText: string;
    constructor(typeDefText: string);
}
export declare type parsedContentType = VueVariable | ImportDeclaration | TypeAliasDeclaration;
declare function parse(str: string): parsedContentType[];
declare const lifecycleHooksArray: string[];
declare type lifecycleHooksArrayType = typeof lifecycleHooksArray[number];
export { parse };
interface VueVariable {
    type?: string;
    variableName: string;
    content: string | null;
}
declare class lifecycleFunction implements VueVariable {
    readonly variableName: lifecycleHooksArrayType;
    readonly content: string;
    constructor(variableName: lifecycleHooksArrayType, content: string);
}
declare class normalFunction implements VueVariable {
    readonly variableName: string;
    readonly content: string;
    constructor(variableName: string, content: string);
}
declare class computed implements VueVariable {
    readonly type: string;
    readonly variableName: string;
    readonly content: string;
    constructor(type: string, variableName: string, content: string);
}
declare class ref implements VueVariable {
    readonly type: string;
    readonly variableName: string;
    readonly content: string;
    constructor(type: string, variableName: string, content: string);
}
declare class reactive implements VueVariable {
    readonly type: string;
    readonly variableName: string;
    readonly content: string;
    constructor(type: string, variableName: string, content: string);
}
declare class prop implements VueVariable {
    readonly isRequired: boolean;
    readonly type: string;
    readonly variableName: string;
    readonly content: string | null;
    constructor(isRequired: boolean, type: string, variableName: string, content: string | null);
}
declare class importComponent implements VueVariable {
    readonly path: string;
    readonly variableName: string;
    type?: string;
    content: null;
    constructor(path: string, variableName: string);
}
export { VueVariable, prop, lifecycleFunction, ref, reactive, computed, normalFunction, importComponent, };
