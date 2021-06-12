import { defineComponent, ref, watch } from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    let items = ref<{ name: String }[]>([]);
    const pageNumber = ref<number>(0);
    watch(pageNumber, async (val) => {
      items = (await axios.get("/api/page/" + val)).data;
    });
    return { items, pageNumber };
  },
});
