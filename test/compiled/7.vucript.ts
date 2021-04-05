import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    type todoItem = { title: string; isDone: boolean; due: Date };
    const todo = ref<todoItem[]>([]);
    const todoTitle = ref<string>("");
    const todoDate = ref<Date>(new Date());
    const addTodo = function () {
      todo.value.push({
        title: todoTitle.value,
        isDone: false,
        due: todoDate.value,
      });
      todoTitle.value = "";
      todoDate.value = new Date();
    };
    const deleteTodo = function (title: string) {
      todo.value.filter((item) => item.title != title);
    };
    const unfinishedTodo = computed(() => {
      return todo.value.filter((item) => !item.isDone);
    });
    return { todo, todoTitle, todoDate, addTodo, deleteTodo, unfinishedTodo };
  },
});
