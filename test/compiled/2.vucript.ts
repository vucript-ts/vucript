import { defineComponent, toRefs, ref, reactive, computed } from "vue";
export default defineComponent({
  props: {
    something: { type: String, required: false, default: "ああああ" },
    counter: { type: Number, required: false, default: 0 },
    me: { type: String, required: true },
  },
  setup(props) {
    const { something, counter, me } = toRefs(props);
    const messageTwo = ref<string>("こんにちは");
    const state = reactive<{ messageOne: string }>({
      messageOne: "Hello",
    });
    const change = () => {
      messageTwo.value += "こんにちは";
    };
    const change2 = function () {
      messageTwo.value += "こんばんは";
    };
    const twiceTheCounter = computed(() => counter);
    return { state, messageTwo, change, change2, twiceTheCounter };
  },
});
