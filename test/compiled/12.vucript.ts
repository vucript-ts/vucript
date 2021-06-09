import { defineComponent, ref, computed } from "vue";
import { reactive, computed } from "../../dist/index.d";
export default defineComponent({
  setup() {
    const messageTwo = ref<string>("こんにちは");
    const messageThree = computed(() => ({
      messageHello: messageTwo.value,
    }));
    return { messageTwo, messageThree };
  },
});
