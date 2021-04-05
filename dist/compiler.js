"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const parser_1 = require("./parser");
const generator_1 = require("./generator");
const prettier_1 = __importDefault(require("prettier"));
function compile(code, format = true) {
    const parsed = parser_1.parse(code);
    const gen = new generator_1.generateVueTemplate(parsed);
    const generatedCode = gen.generate();
    if (!format) {
        return generatedCode;
    }
    return prettier_1.default.format(generatedCode, { semi: true, parser: "typescript" });
}
exports.compile = compile;
