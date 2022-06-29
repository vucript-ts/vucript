import { defineComponent, ref } from "vue";
import { nanoid } from "nanoid";
import axios from "axios";
export default defineComponent({
  setup() {
    const ans = ref<string>("");
    const result = ref<string>("");
    const add = async () => {
      const ansone = (await axios.get("https://yesno.wtf/api")).data.answer;
      if (ansone == ans.value) {
        result.value = "正解";
      } else {
        result.value = "不正解";
      }
    };
    return { ans, result, add };
  },
});
