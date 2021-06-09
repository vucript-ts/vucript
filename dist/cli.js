#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const argparse_1 = require("argparse");
//import { version } from "../package.json";
const parser = new argparse_1.ArgumentParser({
    description: "Compiles vucript to vue component script.",
});
//parser.add_argument("-v", "--version", { action: "version", 'version' });
parser.add_argument("arg1", { help: "Filename of script file." });
parser.add_argument("-js", "--javascript", { help: "Compiles to javascript" });
parser.add_argument("-dir", "--ourdir", {
    help: "Location of outputed files.",
});
_1.default.compileFile(parser.parse_args().arg1, (_a = parser.parse_args().dir) !== null && _a !== void 0 ? _a : "./");
