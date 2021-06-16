let items: reactive<Array<{ title: string }>> = [
    { title: "title1" },
    { title: "title2" },
    { title: "title3" },
];
let firstItem: reactive<{ title: string }> = items.value[0];
function click() {
    items = [{ title: "title a" }, { title: "title b" }, { title: "title c" }];
}
const stop = watch(items, function () {
    firstItem = items[0];
});
function stop2() {
    console.log("止める");
    stop();
}
