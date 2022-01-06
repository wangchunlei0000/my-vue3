## Vue Router

### 安装

`npm install vue-router@4`

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

**响应路由参数变化**

使用参数路由需要注意，两个路由映射到同一个组件，当路由变化时，不会重新渲染组件，也就是组件的生命周期钩子不会被重新调用。

如果需要对组件中参数变化做出响应的话，可以 watch `$route` 做出对应动作

**路径参数的使用**

参数自定义正则

```javascript
// 仅匹配数字
{ path: '/:userId(\\d+)' }
```

可重复的参数

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

可选参数

```javascript
// 使用 ？ 修饰符可将参数标记为可选
{ path: '/users/:username?' }
```
