let counter: reactive<number> = 0;
const twiceTheCounter: computed<number> = () => counter * 2;
const twiceTheCounter2: computed<number> = () => counter * 2;
let twiceTheCounter3: computed<number> = () => counter * 2;
