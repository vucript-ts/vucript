import axios from "axios";
let items: reactive<{ name: String }[]> = [];
let pageNumber: reactive<number> = 0;
watch(pageNumber, async (val) => {
    items = (await axios.get("/api/page/" + val)).data;
});
