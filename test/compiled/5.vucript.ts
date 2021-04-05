import { defineComponent, ref, reactive, onMounted } from "vue";
export default defineComponent({
  setup() {
    const messageTwo = ref<string>("こんにちは");
    const state = reactive<{ messageOne: string }>({ messageOne: "hello" });
    const change = () => {
      messageTwo.value += "こんにちは";
    };
    const change2 = function () {
      messageTwo.value += "こんばんは";
    };
    onMounted(() => {
      console.log("マウントされました");
      change();
    });
    return { state, messageTwo, change, change2 };
  },
});
