import { computed, importComponent } from "vucript";
import { key, Photo } from "../store";
import { useStore } from "vuex";
const store = useStore(key);
importComponent("@/components/Card.vue", "Card");
let onMounted = () => {
    store.dispatch("getPhotos");
};
let photos: computed<Photo[]> = () => store.getters.getPhotos;
