import { checkHaveToken } from '@/utils/token';
import { createRouter, createWebHistory, Router } from 'vue-router'
import { RouteNames } from './const';
// 定义路由
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/HelloWorld.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/components/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      requiresAuth: false
    }
  }
];
export function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requiresAuth)) {
      if (checkHaveToken())
        // if (true)
        next()
      else
        next({ name: RouteNames.LOGIN })
    }
    else {
      next()
    }
  })
}

// 创建 router 实例
export const router = createRouter({
  history: createWebHistory(),
  routes
});
setupRouterGuard(router)
// 导出路由实例


