import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    const yesno = ref<string>("thinking");
    onMounted(async () => {
      try {
        const response = await axios.get("https://yesno.wtf/api");
        yesno.value = response.data["answer"];
      } catch (error) {
        console.error(error);
      }
    });
    return { yesno };
  },
});
