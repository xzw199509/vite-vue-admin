import { expect, test } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from './todo'
import { server } from '../mocks/server';
import { mockAddTodo, mockRemoveTodo, mockTodoList } from '../mocks/handlers';

// mock 中间层
test('add todo', async () => {
  // koa express
  server.use(
    mockAddTodo()
  )
  setActivePinia(createPinia())
  const todoStore = useTodoStore()
  const title = 'xiao'
  await todoStore.addTodo(title)
  // 验证
  expect(todoStore.todos[0].title).toBe(title)
})

test('remove todo', async () => {
  server.use(
    mockAddTodo(),
    mockRemoveTodo()
  )
  setActivePinia(createPinia())
  const todoStore = useTodoStore()
  const title = 'xiao'
  const todo = await todoStore.addTodo(title)
  await todoStore.removeTodo(todo!.id)
  // 验证
  expect(todoStore.todos.length).toBe(0)
})

test('update todo', async () => {
  const todoList = [{ id: 1, title: "写代码" }]
  server.use(
    mockTodoList(todoList)
  )
  setActivePinia(createPinia())
  const todoStore = useTodoStore()
  await todoStore.updateTodoList()
  // 验证
  expect(todoStore.todos[0].title).toBe("写代码")
})

