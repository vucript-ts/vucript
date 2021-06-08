import { reactive, prop, computed } from "Vucript";

let something: prop<string> = "ああああ";

let counter: prop<number> = 0;

let state: reactive<{ messageOne: string }> = {
    messageOne: "Hello",
};
let messageTwo: reactive<string> = "こんにちは";

let change = () => {
    messageTwo += "こんにちは";
};

function change2() {
    messageTwo += "こんばんは";
}

let me: prop<string>;

//let twiceTheCounter = computed(() => counter.value * 2)

const twiceTheCounter: computed<number> = () => counter;
