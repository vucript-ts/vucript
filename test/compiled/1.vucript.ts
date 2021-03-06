import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const counter = ref<number>(0);
    const add = () => {
      counter.value++;
    };
    const twiceTheCounter = computed(() => counter.value * 2);
    return { counter, add, twiceTheCounter };
  },
});
