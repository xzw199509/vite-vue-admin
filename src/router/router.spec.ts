import { checkHaveToken, cleanToken, setToken } from '@/utils/token';
import { it, expect, describe, beforeEach, vi } from 'vitest'
import { createRouterMock } from 'vue-router-mock';
import { RouteNames } from './const';
import { routes, setupRouterGuard } from './index';



function setupRouter() {
  const router = createRouterMock({
    spy: {
      create: (fn: (...args: any[]) => any) => vi.fn(fn),
      reset: (spy: { mockClear: () => any; }) => spy.mockClear(),
    },
    routes: routes,
    useRealNavigation: true
  })
  setupRouterGuard(router)
  return router
}
describe('router', () => {
  // 一、当跳转的页面需要权限认证
  // 1.用户登录了 有token 那么直接跳转
  // 2.用户没有登录 没有token 跳转login页面
  beforeEach(()=>{
    cleanToken()
  })
  describe('requires auth', () => {
    it('should go to about page when hava token', async () => {
      // const router = createRouterMock({
      //   spy: {
      //     create: (fn: (...args: any[]) => any) => vi.fn(fn),
      //     reset: (spy: { mockClear: () => any; }) => spy.mockClear(),
      //   },
      //   routes: routes,
      //   useRealNavigation: true
      // })
      // setupRouterGuard(router)
      setToken('token')
      const router = setupRouter()
      await router.push({ name: RouteNames.ABOUT })
      expect(router.currentRoute.value.name).toBe(RouteNames.ABOUT)
    })
    it('should go to about page when not hava token', async () => {
      // const router = createRouterMock({
      //   spy: {
      //     create: (fn: (...args: any[]) => any) => vi.fn(fn),
      //     reset: (spy: { mockClear: () => any; }) => spy.mockClear(),
      //   },
      //   routes: routes,
      //   useRealNavigation: true
      // })
      // setupRouterGuard(router)
      // setToken('token')
      const router = setupRouter()
      console.log(checkHaveToken());
      
      await router.push({ name: RouteNames.ABOUT })
      expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN)
    })
    it('should go to login page when not hava token', async () => {
      // const router = createRouterMock({
      //   spy: {
      //     create: (fn: (...args: any[]) => any) => vi.fn(fn),
      //     reset: (spy: { mockClear: () => any; }) => spy.mockClear(),
      //   },
      //   routes: routes,
      //   useRealNavigation: true
      // })
      // setupRouterGuard(router)
      // setToken('token')
      const router = setupRouter()
      // console.log(checkHaveToken());
      
      await router.push({ name: RouteNames.LOGIN })
      expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN)
    })
  })

})