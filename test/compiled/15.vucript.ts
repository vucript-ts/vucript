import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  setup() {
    const items = ref<Array<{ title: string }>>([
      { title: "title1" },
      { title: "title2" },
      { title: "title3" },
    ]);
    const firstItem = ref<{ title: string }>(items.value[0]);
    const click = function () {
      items.value = [
        { title: "title a" },
        { title: "title b" },
        { title: "title c" },
      ];
    };
    const stop2 = function () {
      console.log("止める");
      stop();
    };
    const stop = watch(items, function () {
      firstItem.value = items.value[0];
    });
    return { items, firstItem, click, stop2, stop };
  },
});
