# 工程化说明

vue cli 是官方提供的集成 webpack 的脚手架工具

## 安装

```
# cmd
npm i @vue/cli -g
```

## 查看版本

```
# cmd
vue --version
```

## 创建项目

```
# cmd
vue create \*
```

## 启动项目

```
# cmd
npm run serve
```

package.json.scripts 查看修改启动命令

## 打包

```
# cmd
npm run build
```

默认绝对路径，可配置 vue.config.js 改为相对路径

```
// vue.config.js
module.exports = defineConfig({
  publicPath:'./'
})
```

## vscode 设置

trigger on tab 可以将输入的字母加数字内容按 tab 变成标签。

# 项目结构

```
VUE
├── dist # 打包完可以上线的项目目录#
├── node_modules # 第三方依赖包存储目录（自动生成）
├── public # 静态资源目录（无需编译处理）
│ ├── favicon.ico # 浏览器标签页图标
│ └── index.html # 主页面模板文件 ③
├── src # 核心源代码目录
│ ├── api # 接口目录#
│ ├── assets # 静态资源（图片/字体等）
│ ├── components # 通用组件库
│ ├── mixins # 混入目录#
│ ├── router # 路由目录#
│ ├── store # vuex状态目录#
│ ├── utils # 封装的工具函数
│ │ ├── EventBus.js # 事件总线#
│ │ ├── request.js # 请求封装#
│ │ └── storage.js # vuex持久化工具#
│ ├── views # 页面组件目录#
│ ├── App.vue # 根组件文件 ②
│ └── main.js # 入口文件 ①
├── .gitignore # Git版本控制忽略文件
├── babel.config.js # Babel转码配置
├── jsconfig.json # JavaScript项目配置
├── package.json # 项目配置文件（名称/版本/依赖等）
├── README.md # 项目说明文档（本文件）
├── vue.config.js # Vue CLI扩展配置
└── yarn.lock # Yarn依赖版本锁定文件（未使用yarn）
```

## 1.main.js（入口文件）

初始化 Vue 实例，引入核心包和根组件，渲染 index.html

```
// main.js
import Vue from 'vue' // 导入vue核心包
import App from './App.vue' // 导入app组件
Vue.config.productionTip = false // 关闭环境提示
new Vue({ // 实例化Vue对象，配置项render，把App组件渲染到index.html的#app元素上
  // .$mount('#app')和el:'#app'功能相同
  // el: '#app',
  render: h => h(App) // 基于app组件，创建DOM节点并返回
}).$mount('#app')
```

## 2.App.vue（根组件）

包含页面模板、样式和逻辑

## 3.index.html（主页面）

包含挂载容器：`<div id="app">`，引入打包后的 JS/CSS 文件

```
<!-- html -->
<body>

<!-- 提示不支持js -->
<noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>

<!-- 提供id为app的vue挂载容器 -->
<div id="app"></div>

<!-- built files will be auto injected -->
</body>
```

# 运行流程

```
npm run serve
│
v
main.js <—— app.vue
│
v
index.html
```

# 组件化开发

将页面拆成一个个组件，便于维护，复用，提升开发效率

## 分类

组件分为普通组件和根组件
组件由 template 结构，script 行为，style 样式组成

## 普通组件使用

### 局部注册

在 component 文件夹创建组件
使用时用 import 导入 component: {\*}注册后当标签使用

### 全局注册

在 main.js 中 import 导入 vue.component('_',_)注册

### 规范

组件名使用多单词大驼峰命名法
组件的 data 是一个函数，为了保证组件实例的 data 独一份。

### 局部样式

使用 scoped 关键字让样式只作用当前组件 `<style scoped>`
作用是为组件所有元素添加 data-v-hash 属性，css 选择器添加对应的属性选择器

## 组件的通信

通过 props，$emit，provide，inject，eventbus，vuex 方法通信

### prop

prop 是组件的自定义属性，props 可以对数据做校验，有类型校验，非空校验，默认值，自定义校验，

```
// 类型校验
{ *: 类型 }，

// 其他校验
{
  *: {
    type:类型,
    required:空值,
    default:默认,
    validatop: {
      return自定义
    }
  }
}
```

prop 和 data 属性都可以为组件提供数据，prop 数据不能自己改
父组件的数据更新会通过 prop 影响子组件，称为单向数据流

### 父传子

子组件标签的属性会被子组件 props 数组，对象接收

### 子传父$emit

子组件方法传递的事件和参数会被子组件标签对应的事件监听接收

### event bus 通信

创建 utils/EventBus.js，导入并实例化 vue 作为事件总线，事件总线组件$emit方法传递的事件和参数会被自己所有$on 方法监听的对应事件接收

### provide/inject 跨层通信

provide 方法 return 的变量会被下层组件 inject 数组接收，变量为引用类型时是响应式的

# v-model

v-model 是一个语法糖

## 底层实现

```
<!-- html -->
<input v-model="data"/> => <input :value="data" @input="data = $event.target.value"/>
```

v-model 为不同表单绑定不同的属性和事件，$event 可以获取事件形参

## 在封装的组件里使用

由于子组件不能直接修改父组件的数据，使用要拆解 v-model

```
<!-- html -->
<!-- 子： -->
<input :value="value" @input="$emit('input', $event.target.value)" />

<!-- 父： -->
<son :value="data" @input="data = $event" /> => <son v-model="data" />
```

## sync 修饰符实现

```
<!-- html -->
<!-- 子： -->
<input :value="data" @input="$emit('update:data',$event.target.value)" />

<!-- 父： -->
<son :data="value" @update:data = "value = $event"/> => <son :data.sync="value" />
```

# ref

```
// js
this.$refs.* // 用于获取当前组件ref属性为*的dom元素和组件实例，可以调用组件方法
```

# $nextTick,$set

vue 是异步更新 dom 的，$nextTick方法可以确保dom已经更新。
部分情况下直接赋值会破坏变量响应性，$set 可以保证赋值后变量的响应性

# 自定义指令

自定义指令可以封装 dom 操作
组件加载时执行 inserted，值变化时执行 updata
el 为绑定的元素，bindin 可以获取值

## 全局注册

```
// js
Vue.directive(
  '*',
  {
    inserted(el,binding) { el.*() },
    updata(el,binding) { el.* = binding.value }
  }
)
```

## 局部注册

```
// js
directives: {
  '*',
  {
    inserted(el,binding) { el.*() },
    updata(el,binding) { el.* = binding.value }
  }
}
```

# 插槽

可以自定义组件的某些结构
需在组件自定义部分使用 slot 元素，使用时在组件元素内传递结构。
slot 元素内的内容为默认内容

## 具名插槽

需要多个自定义部分时，可以给 slot 元素添加 name 属性
使用时在组件元素内添加<template v-slot="name"/#name>元素定义对应的 slot，默认插槽名为 default

## 作用域插槽

slot 元素添加的属性值，可以被#name="\*"接收

# 路由

确定路径和组件关系
扩展：路由器为设备和 ip 的映射

## 单页应用

spa-single page application
所有功能在一个页面上实现，按需更新
性能高，开发快，初始加载慢，seo 不友好
适合系统、内部网站、移动端等

## VueRouter

响应式路径组件,改变路径切换组件

### 下载

```
# cmd
npm i vue-router@3*
```

### 引入

```
// js
import VueRouter form 'vue-router'
```

### 注册

```
// js
Vue.use(VueRouter)
```

### 实例化

```
// js
const router = new VueRouter()
```

### 注入

```
// main.js
new Vue({
  render: h => h(app),
  router
}).$mount('#app')
```

### 配置目录

src 目录下创建 views 目录，将需要路由的组件配置到 views 目录

### 配置规则

```
// router.js
import...

VueRouter({
  routes:[
    {path: '*', component: *}
  ]
})
```

### 配置出口

```
<!-- html -->
<router-view />
```

### 规范

页面组件配置在 views 目录下，复用组件配置在 components 目录下，本质无区别

### 封装

src 目录下创建 router/router.js
导入 vue
导出 router
导入注入 main.js

### router-link

```
<!-- html -->
<router-link to="*" />
```

提供 class 类名 router-link/-exact-active
相当于$router.push()

#### 自定义类名

```
// js
VueRouter({
  linkActiveClass: '*',
  linkExactActiveClass: '*'
})
```

### 传参

跳转组件传参

#### 查询参数

```
// js
$route.query.* // 获取url参数
```

适合多参数

#### 动态路由

```
// js
$route.params.* // 获取配置 path:'url/:*?...' 规则后 url/* 传递的参数
```

### 重定向

```
// router.js
{ path: '/*', redirect:'/*' }
```

### 自定义 404

```
// router.js
{ path: '*', component: *} // 配置在末尾
```

### 路由模式

```
VueRouter({
  mode:"history/hash"
})
```

history 模式取消#，需后端配合

### js 跳转

```
// js
this.$router.push('/*')
this.$router.push({ path: '*', query: { *: * } })
```

#### 命名跳转

```
// router.js
{ path: '*', name: '*' }
// js
this.$router.push({ name: '*', params: { *: * } })
```

适合 path 字段较长时

### 二级路由

```
// router.js
{ path:'/*', children: [] }
```

### 返回

```
// js
this.$router.back()
```

### 路由守卫

```
// router.js
const nologinlist = ['*']
router.beforeEach((to, from, next) => {
  if (!nologinlist.includes(to.path) && !store.state.user.user.token) {
    next('/login')
  }
  next()
})
```

### 路由懒加载

```
// router.js
{ path: '*', component: () => import('*') },
```

## keep-alive

缓存组件，防止销毁，本身不会被渲染
缓存后 created，mounted，destroyed 不再触发
新增 activated 和 deactivated 钩子

### include

匹配的组件缓存

### exclude

匹配的组件不缓存

### max

缓存上限

# 编码规范

## eslint

错误高亮，自动修复错误，格式化代码
需要项目以根目录打开

```
# cmd
npm install eslint@8 --save-dev
npx eslint --init # 可选，生成配置文件
npx eslint . # 检查
npx eslint . --fix # 自动修复
```

```
// .eslintignore
dist/
node_modules/
```

```
// package.json
"scripts": {
  "eslint": "eslint ."
  "eslint:fix": "eslint . --fix"
},
```

```
// .eslintrc.js
module.exports = {
  root: true, // 设为根目录
  env: {
    node: true, // node 环境
  },
  parserOptions: {
    ecmaVersion: 'latest', // 最新 ES+ 规范
  },
  extends: [ // 规则集，需安装合适版本
    'eslint:recommended', // eslint 推荐规范
    'plugin:vue/essential', // vue 推荐规范
    'plugin:prettier/recommended',  // prettier 推荐规范
  ],
  rules: { // 配置规则
    'no-unused-vars': 'warn', // 未使用变量仅警告
    'no-empty': 'warn', // 空代码块仅警告
  },
}

```

## prettier

统一编码风格，格式化代码

```
# cmd
prettier --write . # 格式化代码，需全局 prettier 包
```

```
// .prettierrc
{
  "semi": false, // 不加分号
  "singleQuote": true, // 使用单引号
  "singleAttributePerLine": true, // 每行一个属性
  "arrowParens": "avoid" // 单参数省略括号
}
```

# vuex

状态管理工具

## 安装

npm install vuex@3

## 创建

src 目录下创建 store/index.js

## 配置

```
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store()
export default store
```

## state

```
// store.js
Vuex.Store({
  state: {
    *: *
  }
})

//js
$store.state.* // 获取*的数据
```

### mapState

映射 state

```
// js
import { mapState } from 'vuex'

computed: {
  ...mapState(['*'])
}
```

## mutations

vuex 为单向数据流，不能直接修改，mutations 用于修改

```
// store.js
Vuex.Store({
  mutations: {
    *(state, *) {
      *
    }
  }
})

// js
$store.commit('*', *) // 调用
```

只能传递一个载荷

### mapMutations

映射 mutations

```
// js
import { mapMutations } from 'vuex'

methods: {
  ...mapMutations(['*'])
}
```

## actions

mutations 不能处理异步，actions 用于处理异步

```
// store.js
Vuex.Store({
    actions: {
    *(context, *) {
      context.commit('*', *)
    }
  }
})

// js
$store.dispatch('*', *) // 调用
```

### mapActions

映射 actions

```
// js
import { mapActions } from 'vuex'

methods: {
  ...mapActions(['*'])
}
```

## getters

基于 state 的计算数据

```
// store.js
Vuex.Store({
  getters: {
    *(state) {
      return * // 必须有返回值
    }
  }
})
```

### mapGetters

映射 getters

```
// js
import { mapGetters } from 'vuex'

computed: {
  ...mapGetters(['*'])
}
```

## modules

src 目录下创建 store/modules/\*.js

```
// modules/*.js
const state = {}
const mutations = {}
const actions = {
  *(context, *) {
      context.commit('*', *) // 调用自己的'*'
      context.commit('*', *, { root: true }) // 调用全局的'*'
    }
}
const getters = {}

export default {
  // namespaced: true, // 开启命名空间
  state,
  mutations,
  actions,
  getters
}

// store.js
Vuex.Store({
  modules: {
    *
  }
})

$store.state.*.* // 访问
```

### module 命名空间

默认挂载在全局
通过 namespaced:true 开启命名空间，挂载于 module

```
$store.state.*.* // 访问
...map*('*',['*']) // 映射
$store.commit/dispatch('*/*', *) // 调用
```

## vuex 持久化

src/utils 目录下创建 storage.js

```
// @/utils/storage.js
export const getstorage = (key) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : data
}
export const setstorage = (key,obj) => {
  localStorage.setItem(key, JSON.stringify(obj))
}
export const rmstorage = (key) => {
  localStorage.removeItem(key)
}

// store.js
import { getstorage,setstorage } from "@/utils/storage"
const key = *
const state = {
    user:getstorage(key)
}
const mutations = {
  setuser(state, data) {
    state.user = data
    setstorage(key, data)
  }
}
```

# json-server 库

api 接口服务工具

## 安装

```
# cmd
npm i json-server -g
```

## 配置

将数据存入 db/index.json

## 运行

```
# cmd
json-server index.json
```

# 请求封装

将所有请求函数从页面中抽离并封装为模块

## 安装 axios

```
# cmd
npm i axios

// 调用
axios(
  {
    url，
    method，
    data{}，
    params{}
  }
).then(
  d=>{}
).catch(
  e=>{}
)
```

## 配置实例

src/utils 目录下创建 request.js

```
import axios from 'axios'

const instance = axios.create({ // 创建实例
  baseURL: 'https://localhost/api/', // 请求地址
  timeout: 1000, // 请求超时时间
  headers: {} // 请求头
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return res
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default instance

// 简单封装
export const get = (url, params, config) => instance.get(url, { params, ...config })
export const post = (url, data, config) => instance.post(url, data, config)
export const put = (url, data, config) => instance.put(url, data, config)
export const del = (url, params, data, config) => instance.delete(url, { params, data, ...config})
```

可以按需求配置 error 和 loading 封装

## 配置 api 模块

src 目录下创建 api/\*.js

```
// api/*.js
import { get, post, put, del } from '@/utils/request.js'
import request from '@/utils/request.js'

export const getapi = data => get('/url',data)
export const postapi = data => request.post('/url',data)
```

# Ui

## vant-ui 库

移动端 ui 组件库
文档：https://vant-ui.github.io/vant/v2/#/zh-CN/

## 移动适配

100vw 为屏幕宽

## postcss 库

自动将 px 转为 vw

### 安装

```
# cmd
npm i postcss-px-to-viewport -D --legacy-peer-deps
```

### 配置

根目录创建 postcss.config.js

```
// postcss.config.js
module.exports={
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth:375
    }
  }
}
```

# mixins

将 vue 组件实例的 data methods 等配置项混入到组件
配置同名时优先组件内部配置，生命周期都会执行
src 目录下创建 mixins/\*.js

```
// mixins.js
export default {
  data() {
    return {}
  },
  created() {},
  methods: {},
}

// js
// 按需引入
import mixins from './mixins/*';
export default {
  mixins:[mixins],
}

// main.js
// 全局引入
import mixins from './mixins/*';
Vue.mixin(mixins)
```

# vue3

链接：https://github.com/dianclar/Vue3-Study
