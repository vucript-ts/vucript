import axios from "axios";
let items: reactive<{ name: String }[]> = [];
let pageNumber: reactive<number> = 0;
const stop = watch(pageNumber, function (val, beforeVal) {
    items = [];
});
const stop2 = watch(pageNumber, async function (val, beforeVal) {
    items = (await axios.get("/api/page/" + val)).data;
});
const stop3 = watch(pageNumber, async (val, beforeVal) => {
    items = (await axios.get("/api/page/" + val)).data;
});
const stop4 = watch(pageNumber, (val, beforeVal) => {
    items = [];
});

const someFunc = function (val, beforeVal) {
    items = [];
};

watch(pageNumber, function (val, beforeVal) {
    items = [];
});
watch(pageNumber, async function (val, beforeVal) {
    items = (await axios.get("/api/page/" + val)).data;
});
watch(pageNumber, async (val, beforeVal) => {
    items = (await axios.get("/api/page/" + val)).data;
});
watch(pageNumber, (val, beforeVal) => {
    items = [];
});
const stop5 = watch(pageNumber, someFunc);
