import {
  defineComponent,
  toRefs,
  ref,
  reactive,
  computed,
  onMounted,
} from "vue";
export default defineComponent({
  props: { something: { type: String, required: true } },
  setup(props) {
    const { something } = toRefs(props);
    const counter = ref<number>(0);
    const messageTwo = ref<string>("こんにちは");
    const state = reactive<{ messageOne: string }>({
      messageOne: "Hello",
    });
    const a1 = function () {
      console.log("k");
    };
    const a2 = () => {
      console.log("l");
    };
    onMounted(() => {
      a1();
    });
    const twiceTheCounter = computed(() => counter.value * 2);
    return { counter, a1, a2, state, messageTwo, twiceTheCounter };
  },
});
