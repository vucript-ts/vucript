"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-namespace */
const compiler_1 = require("./compiler");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
var Vucript;
(function (Vucript) {
    function compile(code) {
        return compiler_1.compile(code);
    }
    Vucript.compile = compile;
    function compileFile(filePath, outDir) {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (data) {
                fs.writeFile(outDir +
                    path.basename(filePath, ".ts") +
                    ".vucript" +
                    path.extname(filePath), compile(data), function (err) {
                    if (err)
                        return console.log(err);
                });
            }
            else {
                console.log(err);
            }
        });
    }
    Vucript.compileFile = compileFile;
})(Vucript || (Vucript = {}));
exports.default = Vucript;
