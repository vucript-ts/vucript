import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const before = ref<string>("");
    const after = ref<string>("");
    const convert = function () {
      after.value = before.value;
    };
    return { before, after, convert };
  },
});
