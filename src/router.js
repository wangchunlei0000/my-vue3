import { createRouter, createWebHistory } from 'vue-router'
import Setting from '@/pages/setting'
import Account from '@/pages/account'

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/setting',
  },
  {
    path: '/setting',
    component: Setting,
    children: [
      {
        path: 'account',
        component: Account
      },
      {
        path: 'list/:id',
        component: Account
      },
      {
        path: 'message',
        component: Account
      }
    ]
  },
]

const webHistory = createWebHistory('/wangcl')

// 创建路由实例
const router = createRouter({
  history: webHistory,
  routes,
})


export default router
