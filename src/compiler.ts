import { parse } from "./parser";
import { generateVueTemplate } from "./generator";
import prettier from "prettier";

function compile(code: string, format = true): string {
    const parsed = parse(code);
    const gen = new generateVueTemplate(parsed);
    const generatedCode = gen.generate();
    if (!format) {
        return generatedCode;
    }
    return prettier.format(generatedCode, { semi: true, parser: "typescript" });
}

export { compile };
