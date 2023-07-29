import { ref } from 'vue'
import { createTodoItem } from './todoItem';
import { fetchTodoList, fetchAddTodo, fetchRemoveTodo } from '../api';
import { defineStore } from 'pinia';

export interface TodoItem {
    id:number,
    title:string
}

type Todos = TodoItem[]

export const useTodoStore = defineStore('todo',()=>{
    const todos = ref<Todos>([])
    
    async function updateTodoList() {
        const {data} = await fetchTodoList()
        todos.value =data.todoList
    } 
    
    async function addTodo(title:string) {
        console.log(title);
        
        const {data, state} =await fetchAddTodo(title)
        const todo = createTodoItem(data.todo.id, data.todo.title)
        if(state){
            todos.value.push(todo)
        }
        return todo
    }

    async function removeTodo(id:number) {
        const {data, state} =await fetchRemoveTodo(id)
        const todoItem = findTodo(data.id)
        if(state){
            if(todoItem){
                todos.value = todos.value.filter((todoItem)=>{
                    return todoItem.id !== id;
                })
            }
        }
        return todoItem;
    }
    function findTodo(id: number) {
        return todos.value.find((todoItem) => {
          return todoItem.id === id;
        });
      }
    
    return {
        todos,
        updateTodoList,
        addTodo,
        removeTodo,
        findTodo
    }
})