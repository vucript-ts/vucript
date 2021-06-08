import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const counter = ref<number>(0);
    const twiceTheCounter = computed(() => counter.value * 2);
    const twiceTheCounter2 = computed(() => counter.value * 2);
    const twiceTheCounter3 = computed(() => counter.value * 2);
    return { counter, twiceTheCounter, twiceTheCounter2, twiceTheCounter3 };
  },
});
