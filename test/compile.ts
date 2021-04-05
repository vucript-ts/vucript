import Vucript from "../src/index";

import * as fs from "fs";

fs.readdir("./test/beforecompile/", (err, files) => {
    files.forEach((file) => {
        Vucript.compileFile("./test/beforecompile/" + file, "./test/compiled/");
    });
});
