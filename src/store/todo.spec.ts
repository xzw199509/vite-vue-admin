import { expect, it, describe, beforeEach, vi, test } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from './todo'
import { fetchTodoList, fetchAddTodo, fetchRemoveTodo } from '../api';
import axios from 'axios'

vi.mock('axios')
test('add todo', async () => {
  // vi.mocked(axios.post).mockResolvedValue({
  //   data: { data: { todo: { id: 1, title: 'xiao' } }, state: 1 },
  // })
  // vi.mocked(axios.post).mockImplementation((path, { title }: any) => {
  //   console.log(path, title);
  //   return Promise.resolve({ data: { data: { todo: { id: 1, title } }, state: 1 } })
  // })// 状态验证
  // 升级
  vi.mocked(fetchAddTodo).mockImplementation((title) => {
    return Promise.resolve({
      data: { todo: { id: 1, title } },
      state: 1
    })
  })// 状态验证
  setActivePinia(createPinia())
  const todoStore = useTodoStore()
  const title = 'xiao'
  await todoStore.addTodo(title)
  // 验证
  expect(todoStore.todos[0].title).toBe(title)
  // expect(axios.post).toBeCalledWith("/api/addTodo",{title}) // 行为验证

})

test('remove todo', async () => {
  // 第一次添加
  vi.mocked(axios.post).mockImplementationOnce((path, { title }: any) => {
    console.log(path, title);
    return Promise.resolve({ data: { data: { todo: { id: 1, title } }, state: 1 } })
  })
  // 第二次删除
  vi.mocked(axios.post).mockImplementationOnce((path, { id }: any) => {
    console.log(path, title);
    return Promise.resolve({ data: { data: { id }, state: 1 } })
  })
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
  vi.mocked(axios.get).mockResolvedValue({ data: { data: { todoList } } })

  setActivePinia(createPinia())
  const todoStore = useTodoStore()
  await todoStore.updateTodoList()
  // 验证
  expect(todoStore.todos[0].title).toBe("写代码")
})

