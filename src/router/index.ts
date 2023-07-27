import { createRouter, createWebHistory } from 'vue-router'
// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/HelloWorld.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/components/About.vue')
  }
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 导出路由实例
export default router;


