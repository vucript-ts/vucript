import { reactive, prop, computed } from "Vucript";

let counter: reactive<number> = 0;

let something: prop<string>;

let onMounted = () => {
    a1();
};

function a1() {
    console.log("k");
}

const a2 = () => {
    console.log("l");
};

let state: reactive<{ messageOne: string }> = {
    messageOne: "Hello",
};
let messageTwo: reactive<string> = "こんにちは";

const twiceTheCounter: computed<number> = () => counter * 2;
