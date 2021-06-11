declare namespace Vucript {
    function compile(code: string): string;
    function compileFile(filePath: string, outDir: string): void;
}
export default Vucript;
export type reactive<T> = T;
export type prop<T> = T;
export type computed<T> = { (): T };
export function importComponent(filepath: string, name): void;
