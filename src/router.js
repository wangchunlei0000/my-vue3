import { createRouter, createWebHistory } from 'vue-router'
import Setting from '@/pages/setting'
import Account from '@/pages/account'
import List from '@/pages/list'
import Message from '@/pages/message'

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/setting',
  },
  {
    path: '/setting',
    component: Setting,
    redirect: { name: 'message' },
    // 嵌套路由
    children: [
      {
        path: 'account/:id',
        name: 'account',
        component: Account,
        alias: ':id',
        props: true,
      },
      {
        path: 'list',
        name: 'list',
        components: {
          default: List,
          test1: Account,
          test2: Message,
        },
        props: {
          default: true,
          test1: true,
          test2: { testProps: '666' },
        },
      },
      {
        path: 'message',
        name: 'message',
        component: Message,
      },
    ],
  },
  {
    path: '/account',
    name: 'aa',
    alias: '/testaa',
    component: Account,
    redirect: '/setting',
  },
]

const webHistory = createWebHistory('/wangcl')

// 创建路由实例
const router = createRouter({
  history: webHistory,
  routes,
})

// 前置守卫
router.beforeEach((to, from, next) => {
  console.log('beforeEach --- 前置守卫', to, from, next)
  if (to.path === '/setting/list') {
    console.log('---/setting/list 被前置守卫处理了--')
    next()
  } else {
    next()
  }
})

export default router
