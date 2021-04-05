import { VueVariable, parsedContentType } from "./parser";
export declare class generateVueTemplate {
    parsed: VueVariable[];
    other: string[];
    imports: string[];
    constructor(parsedtmp: parsedContentType[]);
    generate(): string;
    private generateImport;
    private isUsingProp;
    private isUsingRef;
    private refs;
    private isUsingReative;
    private reactives;
    private isUsingComputed;
    private computedFuncs;
    private normalFuncs;
    private usedLifecycleFuncs;
    private lifecycleFuncs;
    private importComponents;
    private returnVals;
    private escapeRefs;
}
