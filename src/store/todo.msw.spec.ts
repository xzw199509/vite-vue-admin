import { expect, vi, test,beforeAll,afterAll,afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from './todo'
import { fetchTodoList, fetchAddTodo, fetchRemoveTodo } from '../api';
import { server } from '../mocks/server';
import { rest } from 'msw';
// Mock Service Worker 是一个 API 模拟库，它使用 Service Worker API 来拦截实际请求。 —— MSW docs
// setup msw
beforeAll(()=>{
  server.listen()
})
afterEach(()=>{
  server.resetHandlers()
})
afterAll(()=>{
  server.close()
})

// mock 中间层
vi.mock('../api') // 版本二 不暴露操作
test.only('add todo', async () => {
  // vi.mocked(fetchAddTodo).mockImplementation((title) => {
  //   return Promise.resolve({
  //     data: { todo: { id: 1, title } },
  //     state: 1
  //   })
  // })

  // koa express
  server.use(
    rest.post('http://localhost/api/addTodo',(req, res, context)=>{
      console.log(req, res, context);
      return res(
        context.json({
          data: { todo: { id: 1, title:'xiao' } },
          state: 1
        })
      )
    })
  )
  setActivePinia(createPinia())
  const todoStore = useTodoStore()
  const title = 'xiao'
  await todoStore.addTodo(title)
  // 验证
  expect(todoStore.todos[0].title).toBe(title)
  // expect(axios.post).toBeCalledWith("/api/addTodo",{title}) // 行为验证

})

test('remove todo', async () => {
  // // 第一次添加
  // vi.mocked(axios.post).mockImplementationOnce((path, { title }: any) => {
  //   console.log(path, title);
  //   return Promise.resolve({ data: { data: { todo: { id: 1, title } }, state: 1 } })
  // })
  // // 第二次删除
  // vi.mocked(axios.post).mockImplementationOnce((path, { id }: any) => {
  //   console.log(path, title);
  //   return Promise.resolve({ data: { data: { id }, state: 1 } })
  // })

  // 升级为版本二
  vi.mocked(fetchAddTodo).mockImplementation((title) => {
    return Promise.resolve({
      data: { todo: { id: 1, title } },
      state: 1
    })
  })
  vi.mocked(fetchRemoveTodo).mockImplementationOnce(( id ) => {
    return Promise.resolve({
       data: { id}, state: 1 
    })
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
  vi.mocked(fetchTodoList).mockResolvedValue( { data: { todoList } })

  setActivePinia(createPinia())
  const todoStore = useTodoStore()
  await todoStore.updateTodoList()
  // 验证
  expect(todoStore.todos[0].title).toBe("写代码")
})

