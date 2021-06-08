import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const messageTwo = ref<string>("こんにちは");
    const change = () => {
      messageTwo.value += "こんにちは";
      messageTwo.value += "こんにちは";
    };
    const change2 = function () {
      messageTwo.value += "こんばんは";
      messageTwo.value += "こんばんは";
    };
    const change3 = () => {
      messageTwo.value += "こんにちは";
      messageTwo.value += "こんにちは";
    };
    return { messageTwo, change, change2, change3 };
  },
});
