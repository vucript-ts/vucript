import { defineComponent, toRefs } from "vue";
export default defineComponent({
  props: { message: { type: String, required: true } },
  setup(props) {
    const { message } = toRefs(props);
    return {};
  },
});
