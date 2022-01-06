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
        props: true
      },
      {
        path: 'list',
        name: 'list',
        components: {
          default: List,
          test1: Account,
          test2: Message
        },
        props: {
          default: true,
          test1: true,
          test2: { testProps: '666' }
        }
      },
      {
        path: 'message',
        name: 'message',
        component: Message
      }
    ]
  },
  {
    path: '/account',
    name: 'aa',
    alias: '/testaa',
    component: Account,
    redirect: '/setting'
  }
]

const webHistory = createWebHistory('/wangcl')

// 创建路由实例
const router = createRouter({
  history: webHistory,
  routes,
})

router.beforeEach((to, from ) => {
  console.log(to, from)
  if(to.path === '/setting/list') {
    console.log('-----')
    return {path:'/setting/account'}
  }
  // return false
})


export default router
