import { reactive } from "vucript";

let before: reactive<string> = "";
let after: reactive<string> = "";
let convert = function () {
    after = before;
};