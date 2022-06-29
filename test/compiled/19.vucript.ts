import { defineComponent, ref, computed } from "vue";
import { nanoid } from "nanoid";
class ITodo {
    content: string;
    completed: boolean;
    nanoid: string;
    created: number;
}
export default defineComponent({
    setup() {
        const ans = ref<string>("");
        const todos = ref<ITodo[]>([]);
        const add = function () {
            todos.value.push({
                content: ans.value,
                completed: false,
                nanoid: nanoid(),
                created: new Date().getDate(),
            });
        };
        const sortedTodos = computed(() =>
            todos.value.sort((a, b) =>
                a.completed === b.completed ? 0 : a.completed ? 1 : -1
            )
        );
        return { ans, todos, add, sortedTodos };
    },
});
