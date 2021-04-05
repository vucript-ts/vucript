#!/usr/bin/env node

import Vucript from "./";

import { ArgumentParser } from "argparse";
//import { version } from "../package.json";

const parser = new ArgumentParser({
    description: "Compiles vucript to vue component script.",
});

//parser.add_argument("-v", "--version", { action: "version", 'version' });
parser.add_argument("arg1", { help: "Filename of script file." });
parser.add_argument("-js", "--javascript", { help: "Compiles to javascript" });
parser.add_argument("-dir", "--ourdir", {
    help: "Location of outputed files.",
});

Vucript.compileFile(parser.parse_args().arg1, parser.parse_args().dir ?? "./");
