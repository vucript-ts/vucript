import { defineComponent, ref, computed } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
export default defineComponent({
  components: { HelloWorld },
  setup() {
    const counter = ref<number>(0);
    const add = () => {
      counter.value++;
    };
    const twiceCounter = computed(() => counter.value * 2);
    return { counter, add, twiceCounter };
  },
});
