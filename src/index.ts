/* eslint-disable @typescript-eslint/no-namespace */
import { compile as compiles } from "./compiler";
import * as fs from "fs";
import * as path from "path";
namespace Vucript {
    export function compile(code: string): string {
        return compiles(code);
    }
    export function compileFile(filePath: string, outDir: string): void {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (data) {
                fs.writeFile(
                    outDir +
                        path.basename(filePath, ".ts") +
                        ".vucript" +
                        path.extname(filePath),
                    compile(data),
                    function (err) {
                        if (err) return console.log(err);
                    }
                );
            } else {
                console.log(err);
            }
        });
    }
}

export default Vucript;
