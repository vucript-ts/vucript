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
    readonly identifier: Identifiers[] | null;
    readonly startPosition: number;
    constructor(variableName: lifecycleHooksArrayType, content: string, identifier: Identifiers[] | null, startPosition: number);
}
declare class normalFunction implements VueVariable {
    readonly variableName: string;
    readonly content: string;
    readonly identifier: Identifiers[] | null;
    readonly startPosition: number;
    constructor(variableName: string, content: string, identifier: Identifiers[] | null, startPosition: number);
}
declare class computed implements VueVariable {
    readonly type: string;
    readonly variableName: string;
    readonly content: string;
    readonly identifier: Identifiers[] | null;
    readonly startPosition: number;
    constructor(type: string, variableName: string, content: string, identifier: Identifiers[] | null, startPosition: number);
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
declare class Identifiers {
    start: number;
    end: number;
    str: string;
    constructor(start: number, end: number, str: string);
}
