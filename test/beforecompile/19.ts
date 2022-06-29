import { reactive, computed } from "vucript";
import { nanoid } from "nanoid";
const ans: reactive<string> = "";
class ITodo {
    content: string;
    completed: boolean;
    nanoid: string;
    created: number;
}
const todos: reactive<ITodo[]> = [];
function add() {
    todos.push({
        content: ans,
        completed: false,
        nanoid: nanoid(),
        created: new Date().getDate(),
    });
}
const sortedTodos: computed<ITodo[]> = () =>
    todos.sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
