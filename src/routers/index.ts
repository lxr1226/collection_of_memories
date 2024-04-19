import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 配置映射关系
  routes: [
    {
      path: '/',
      redirect: '/LogIn'
    },
    {
      path: '/LogIn',
      component: () => import('@/views/login/LogIn.vue')
    },
    {
      path: '/MainPage',
      component: () => import('@/views/mains/MainPage.vue')
    }
  ]
})

export default router
