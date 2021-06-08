let messageTwo: reactive<string> = "こんにちは";
let change = () => {
    messageTwo += "こんにちは";
    messageTwo += "こんにちは";
};
function change2() {
    messageTwo += "こんばんは";
    messageTwo += "こんばんは";
}
const change3 = () => {
    messageTwo += "こんにちは";
    messageTwo += "こんにちは";
};
