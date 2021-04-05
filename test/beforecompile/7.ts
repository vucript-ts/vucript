import { reactive, computed, importComponent } from 'Vucript';
type todoItem = { title: string; isDone: boolean; due: Date };
let todo: reactive<todoItem[]> = [];
let todoTitle: reactive<string> = "";
let todoDate: reactive<Date> = new Date();

function addTodo() {
    todo.push({ title: todoTitle, isDone: false, due: todoDate });
    todoTitle = "";
    todoDate = new Date();
}

function deleteTodo(title: string) {
    todo.filter((item) => item.title != title);
}

let unfinishedTodo:computed<todoItem[]>=()=>{
    return todo.filter(item=>!(item.isDone));
}