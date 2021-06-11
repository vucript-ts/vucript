declare namespace Vucript {
    function compile(code: string): string;
    function compileFile(filePath: string, outDir: string): void;
}
export default Vucript;
