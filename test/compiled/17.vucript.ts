import { defineComponent, computed, onMounted } from "vue";
import Card from "@/components/Card.vue";
import { key, Photo } from "../store";
import { useStore } from "vuex";
export default defineComponent({
  components: { Card },
  setup() {
    const store = useStore(key);
    onMounted(() => {
      store.dispatch("getPhotos");
    });
    const photos = computed(() => store.getters.getPhotos);
    return { photos };
  },
});
