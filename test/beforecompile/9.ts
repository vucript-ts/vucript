let counter: reactive<number> = 0;
const twiceTheCounter: computed<number> = () => counter * 2;
const thirdTheCounterTest: computed<number> = () => counter * 3;
const forthTheCounterTest: computed<number> = () => {
    counter * 4;
};
function addCounter() {
    counter++;
}
function addCounterTwo() {
    console.log(counter);
    counter++;
}
