import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const counter = ref<number>(0);
    const addCounter = function () {
      counter.value++;
    };
    const addCounterTwo = function () {
      console.log(counter.value);
      counter.value++;
    };
    const twiceTheCounter = computed(() => counter.value * 2);
    const thirdTheCounterTest = computed(() => counter.value * 3);
    const forthTheCounterTest = computed(() => {
      counter.value * 4;
    });
    return {
      counter,
      twiceTheCounter,
      thirdTheCounterTest,
      forthTheCounterTest,
      addCounter,
      addCounterTwo,
    };
  },
});
