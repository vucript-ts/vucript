let messageTwo: reactive<string> = "こんにちは";
const messageThree: computed<{ messageHello: string }> = () => ({
    messageHello: messageTwo,
});
