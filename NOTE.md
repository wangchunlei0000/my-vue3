## Vue Router

---
## 安装

`npm install vue-router@4`

---
## 基本使用

html：
```html
<!-- 路由导航 -->
<!-- 相当于 a 标签 to <=> href-->
<router-link to="/home">Go to Home</router-link>
<router-link to="/about">Go to About</router-link>
<!-- 路由匹配到的组件渲染在这里 -->
<router-view />

```
router.js
```javascript
import VueRouter from 'vue-router'
import Vue from 'vue'

// 定义路由
const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
]
// 创建路由实例并传递 routes
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

// 创建 Vue 实例并挂载
const app = Vue.createApp(App)
// 通过调用 app.use(router) 可以在任意组件中使用 this.$router this.$route
app.use(router)
app.mount('#app')

```

---

## 动态路由匹配

很多时候路由需要`路径参数`，在路由路径中以动态形式表现

```javascript
const routes = [
  {
    path: '/user/:userId',
    component: User
  }
]
// 这样 /user/tom 和 /user/tony 会映射到同一个路由
```
当路径参数用`:`表示，路由匹配上时，参数会在 `$route.params` 中暴露出来


### **响应路由参数变化**

~~~

使用参数路由需要注意，两个路由映射到同一个组件，当路由变化时，不会重新渲染组件，也就是组件的生命周期钩子不会被重新调用。

如果需要对组件中参数变化做出响应的话，可以 watch `$route` 做出对应动作

~~~

### **路径参数的使用**

**参数自定义正则**

```javascript
// 仅匹配数字
{ path: '/:userId(\\d+)' }
```

**可重复的参数**

```javascript
// 能匹配 /one, /one/two ...
{ path: '/:username+' },
// 能匹配 /, /one, /one/two ...
{ path: '/:username*' }
```

这提供一个 `参数数组` 而不是字符串，并且在使用命名路由时也要传递数组
```javascript
router.resolve({name: 'username', params: { username: [] } })
```

**可选参数**

```javascript
// 使用 ？ 修饰符可将参数标记为可选
{ path: '/users/:username?' }
```

## 嵌套路由

```javascript
const routes = [
  {
    path: '/setting',
    component: Setting,
    children: [
      {
        // 当 /setting/account 匹配成功
        // Account 将渲染到 Setting 的 <router-view /> 内部
        path: 'account',
        component: Account
      },
      {
        path: 'message',
        component: Message
      }
    ]
  }
]
```

## 编程路由导航

除了使用 `<router-link>` 标签导航路由，还可以使用 `router` 的实例方法，通过代码实现路由导航

### **$router.push 导航到不同位置**

`<router-link>` <=> `$router.push` ，此方法会向 history 栈中添加新记录

```javascript
// 字符串路径
router.push('/setting/account')

// 带路径的对象
router.push({ path: '/setting/account' } )

// 命名路由 + 参数
// /account/:accountName
router.push({ name: 'account', params: { accountName: 'wangcl' } })

// 带查询参数 /account?accountName=wangcl
router.push({ path: '/account', query: { accountName: 'wangcl' } })

// 带 hash /account#accountName
router.push({ path: '/account', hash: '#accountName' })
```

**path 和 params 不能同时使用**

### **$router.replace 替换当前位置**

作用类似 `$router.push` 唯一不同是在导航时不会产生 history 记录，只是取代了当前的路由

`<router-link replace>` <=> `$router.replace` <=> `$router.push({ replace: true })`

### **$router.go**

```javascript
// 前进一条记录 === router.forward()
router.go(1)

// 返回一条记录 === router.back()
router.go(-1)

// 超出范围 静默失败
router.go(100)
```

---

## 命名路由

可以给任何路由提供 `name`

```javascript
{
  path: '/setting/:username',
  name: 'user',
  component: User
}
```

导航路由时

```javascript
// 需要给 to 传递对象
<router-link :to="{ name: 'user', params: { username: 'wangcl' } }"> user </router-link>

router.push({ name: 'user', params: { username: 'wangcl' } })
```

---

## 命名视图

一个页面想要展示多个视图，可以使用多个 `<router-view />`

```html
<router-view name="test1" />
<router-view name="test2" />
<!-- 没写 name 默认为 default -->
<router-view />

```

```javascript
{
  path: '/setting',
  component: Setting,
  children: [
    {
      path: 'list',
      name: 'list',
      // 使用 components 配置 /setting/list 路由下展示的 路由组件
      components: {
        default: List,
        test1: Account,
        test2: Message
      }
    },
    {
      path: 'message',
      name: 'message',
      component: Message
    }
  ]
},
```

---

## 重定向和别名

```javascript
const routes = [
  {
    path: '/test',
    // 从 / 重定向到 /setting
    redirect: '/setting',
    // 重定向的目标可以是 命名路由
    // redirect: { name: '/setting' }
    // 也可以是函数
    // redirect: to => {
    //   // to: 是目标路由 也就是 /test
    //   return { path: '/setting', query: { param1: to.params.param1 } }
    // }
  }
]
```

### **别名**

给路由设置别名

```javascript
const routes = [
  {
    path: '/setting',
    component: Setting,
    alias: '/alias-setting'
  }
]
```

上面的配置，会在用户访问别名 （/alias-setting）时匹配 `/setting` 路由到 `Setting` 组件

---

## 路由组件传参

配置路由的 props 可以将 `$route.params` 在组件中以 `props` 接收

```html
<!-- setting.vue 组件 -->
<div> {{ settingId }} </div>
...
props: {
  // 接收路由的路径参数 settingId => route.params.settingId
  settingId: Number
}
```

```javascript
const routes = [
  {
    path: '/setting/:settingId',
    component: Setting,
    props: true
  }
]
```

```javascript
// 命名视图
const routes = [
  {
    path: '/setting/:settingId',
    components: { default: Setting, test: Test},
    props: { default: true, test: false }
  }
]
```

```javascript
// 对象模式设置 props
// 将 { propParam1: 'heihei' } 原样设置为组件 props
const routes = [
  {
    path: '/setting/:settingId',
    component: Setting,
    props: { propParam1: 'heihei' }
  }
]
```

```javascript
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

`/search?param=vue3` 将传递 `{ query: 'vue3' }` 作为 `props` 给 `SearchUser` 组件

---

## 前置守卫

```javascript
const router = createRouter({...})

router.beforeEach((to, from, next) => {
  // to 目标路由
  // from 当前路由
  // next 下一步动作
  // if(to) {
  //   next()
  // } else {
  //   next({ name: '404' })
  // }
  // return false // 取消导航
  // if(to) {
  //   return { path:'/test' }
  // }
})
```