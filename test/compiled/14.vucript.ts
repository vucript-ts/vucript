import { defineComponent, ref, watch } from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    const items = ref<{ name: String }[]>([]);
    const pageNumber = ref<number>(0);
    const someFunc = function (val, beforeVal) {
      items.value = [];
    };
    const stop = watch(pageNumber, function (val, beforeVal) {
      items.value = [];
    });
    const stop2 = watch(pageNumber, async function (val, beforeVal) {
      items.value = (await axios.get("/api/page/" + val)).data;
    });
    const stop3 = watch(pageNumber, async (val, beforeVal) => {
      items.value = (await axios.get("/api/page/" + val)).data;
    });
    const stop4 = watch(pageNumber, (val, beforeVal) => {
      items.value = [];
    });
    watch(pageNumber, function (val, beforeVal) {
      items.value = [];
    });
    watch(pageNumber, async function (val, beforeVal) {
      items.value = (await axios.get("/api/page/" + val)).data;
    });
    watch(pageNumber, async (val, beforeVal) => {
      items.value = (await axios.get("/api/page/" + val)).data;
    });
    watch(pageNumber, (val, beforeVal) => {
      items.value = [];
    });
    const stop5 = watch(pageNumber, someFunc);
    return { items, pageNumber, someFunc };
  },
});
