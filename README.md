# 工程化说明

vue cli是官方提供的集成webpack的脚手架工具

## 安装

npm i @vue/cli -g

## 查看版本

vue --version

## 创建项目

vue create *

## 启动项目

npm run serve
package.json.scripts查看修改启动命令

### vscode设置

trigger on tab可以将输入的字母加数字内容按tab变成标签。

# 项目结构

VUE
├── node_modules        # 第三方依赖包存储目录（自动生成）
├── public              # 静态资源目录（无需编译处理）
│   ├── favicon.ico     # 浏览器标签页图标
│   └── index.html      # 主页面模板文件 ③
├── src                 # 核心源代码目录
│   ├── assets          # 静态资源（图片/字体等）
│   ├── components      # 通用组件库
│   ├── utils           # 封装的工具函数
│   ├── App.vue         # 根组件文件 ②
│   └── main.js         # 入口文件 ①
├── .gitignore          # Git版本控制忽略文件
├── babel.config.js     # Babel转码配置
├── jsconfig.json       # JavaScript项目配置
├── package.json        # 项目配置文件（名称/版本/依赖等）
├── README.md           # 项目说明文档（本文件）
├── vue.config.js       # Vue CLI扩展配置
└── yarn.lock           # Yarn依赖版本锁定文件（未使用yarn）

## 1.main.js（入口文件）

初始化Vue实例，引入核心包和根组件，渲染index.html
//导入vue核心包
import Vue from 'vue'
//导入app组件
import App from './App.vue'
//关闭环境提示
Vue.config.productionTip = false
//实例化Vue对象，配置项render，把App组件渲染到index.html的#app元素上
new Vue({
  //.$mount('#app')和el:'#app'功能相同
  // el: '#app',
  render: h => h(App),
  //render: function (createElement) {
  //基于app组件，创建DOM节点并返回
  //  return createElement(App)
  //}
}).$mount('#app')

## 2.App.vue（根组件）

包含页面模板、样式和逻辑

## 3.index.html（主页面）

包含挂载容器：`<div id="app">`，引入打包后的JS/CSS文件

<body>
<!-- 提示不支持js -->
<noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>
<!-- 提供id为app的vue挂载容器 -->
<div id="app"></div>
<!-- built files will be auto injected -->
</body>

# 运行流程

npm run serve
│
v
main.js <—— app.vue
│
v
index.html

# 组件化开发

将页面拆成一个个组件，便于维护，复用，提升开发效率

## 分类

组件分为普通组件和根组件
组件由template结构，script行为，style样式组成

## 普通组件使用

### 局部注册

在component文件夹创建组件
使用时用import导入component:{*}注册后当标签使用

### 全局注册

在main.js中import导入vue.component('*',*)注册

### 规范

组件名使用多单词大驼峰命名法
组件的data是一个函数，为了保证组件实例的data独一份。

### 取消强制多单词

在package.json中配置
"eslintConfig": {
  "rules": {
    "vue/multi-word-component-names": 0
  }
}

### 局部样式

使用scoped关键字让样式只作用当前组件 `<style scoped>`
作用是为组件所有元素添加data-v-hash属性，css选择器添加对应的属性选择器

## 组件的通信

通过props，$emit，provide，inject，eventbus，vuex方法通信

### prop

prop是组件的自定义属性，props可以对数据做校验，有类型校验，非空校验，默认值，自定义校验，类型校验{*:类型}，其他校验{*:{type:类型,required:空值,default:默认,validatop:{return自定义}}}
prop和data属性都可以为组件提供数据，prop数据不能自己改
父组件的数据更新会通过prop影响子组件，称为单向数据流

### 父传子

子组件标签的属性会被子组件props数组，对象接收

### 子传父$emit

子组件方法传递的事件和参数会被子组件标签对应的事件监听接收

### event bus通信

创建utils/EventBus.js，导入并实例化vue作为事件总线，事件总线组件$emit方法传递的事件和参数会被自己所有$on方法监听的对应事件接收

### provide/inject跨层通信

provide方法return的变量会被下层组件inject数组接收，变量为引用类型时是响应式的

# v-model

v-model是一个语法糖

## 底层实现

`<input v-model="data"/>`-><input :value="data" @input="data = $event.target.value"/>
$event在签里可以获取事件形参，v-model为不同表单绑定不同的属性和事件

## 在封装的组件里使用

由于子组件不能直接修改父组件的数据，使用要拆解v-model
子：<input :value="value" @input="$emit('input',$event.target.value)"/>
父：<son :value="data" @input="data = $event"/>->`<son v-model="data"/>`

## sync修饰符实现

子：<input :value="data" @input="$emit('update:data',$event.target.value)"/>
父：<son :data="value" @update:data = "value = $event"/>->`<son :data.sync="value"/>`

# ref

this.$refs.*属性用于获取当前组件ref属性为*的dom元素和组件实例，可以调用组件方法

# $nextTick

vue是异步更新dom的，$nextTick方法可以确保dom更新。

# 自定义指令

自定义指令可以封装dom操作
组件加载时执行inserted，值变化时执行updata
el为绑定的元素，bindin可以获取值

## 全局注册

Vue.directive('*',{inserted(el,binding){el.*()},updata(el,binding){el.*=binding.value}})

## 局部注册

directives:{*:{inserted(el,binding){el.*()},updata(el,binding){el.*=binding.value}}}

# 插槽

可以自定义组件的某些结构
需在组件自定义部分使用slot元素，使用时在组件元素内传递结构。
slot元素内的内容为默认内容

## 具名插槽

需要多个自定义部分时，可以给slot元素添加name属性
使用时在组件元素内添加<template v-slot="name"/#name>元素定义对应的slot，默认插槽名为default

## 作用域插槽

slot元素添加的属性值，可以被#name="*"接收

# 路由

确定路径和组件关系
扩展：路由器为设备和ip的映射

## 单页应用

spa-single page application
所有功能在一个页面上实现，按需更新
性能高，开发快，初始加载慢，seo不友好
适合系统、内部网站、移动端等

## VueRouter

响应式路径组件,改变路径切换组件

### 下载

npm i vue-router@3*

### 引入

import VueRouter form 'vue-router'

### 注册

Vue.use(VueRouter)

### 实例化

const router = new VueRouter()

### 注入

new Vue({
  render:h=>h(app)
  router
}).$mount('#app')

### 配置目录

src目录下创建views目录，将需要路由的组件配置到views目录

### 配置规则

import...

VueRouter({
  routes:[
    {path:'/*',component:*}
  ]
})

### 配置链接

href="#/*"

### 配置出口

<router-view/>

### 规范

页面组件配置在views目录下，复用组件配置在components目录下，本质无区别

### 封装

src目录下创建router/router.js
导入vue
导出router
导入注入main.js

### router-link

<router-link to="/*"/>
提供类名router-link/-exact-active

#### 自定义类名

VueRouter({
  linkActiveClass:'*',
  linkExactActiveClass:'*'
})

### 传参

跳转组件传参

#### 查询参数

$route.query.*属性获取to="/*?*=*&"链接传递的参数
适合多参数

#### 动态路由

$route.params.*属性获取配置path:'/*:*?'规则后to="/*/*"链接传递的参数

### 重定向

{path:'/*',redirect:'/*'}

### 自定义404

{path:'*',component:*}

### 路由模式

VueRouter({
  mode:"history/hash"
})
history模式取消#，需后端配合

### js跳转

this.$router.push('/*')
this.$router.push({path:'*',query:{*:*}})

#### 命名跳转

{path:'*',name:'*'}
this.$router.push({name:'*',params:{*:*}})
适合path字段较长时

### 二级路由

{path:'/',children:[]}

### 返回

this.$router.back()

### 路由守卫
const userhrmllist = ['*']
router.beforeEach((to, from, next) => {
  if(userhrmllist.includes(to.path)){
    if(!store.state.user.user.token){
      next('/login')
    }
  }
  next()
})

## keep-alive

缓存组件，防止销毁，本身不会被渲染
缓存后created，mounted，destroyed不再触发
新增activated和deactivated钩子

### include

匹配的组件缓存

### exclude

匹配的组件不缓存

### max

缓存上限

# ESlint

代码规范，统一编码风格

## vscode插件eslint

规范错误高亮，自动修复错误，格式化代码
需要项目以根目录打开

# vuex

状态管理工具

## 安装

npm install vuex@3

## 创建

src目录下创建store/index.js

## 配置

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store()
export default store

## state

Vuex.Store({
  state:{
    *:*
  }
})
提供数据，通过$store.state.*获取

### mapState

映射state
import { mapState } from 'vuex'
...
computed:{
  ...mapState(['*'])
}

## mutations

vuex为单向数据流，不能直接修改，mutations用于修改
Vuex.Store({
  mutations:{
    *(state,*){
      *
    }
  }
})
$store.commit('*',*)方法调用
只能传递一个载荷

### mapMutations

映射mutations
import { mapMutations } from 'vuex'
...
methods:{
  ...mapMutations(['*'])
}

## actions

mutations不能处理异步，actions用于处理异步
Vuex.Store({
  actions:{
    *(context,*){
      ...context.commit('*',*)
    }
  }
})
通过$store.dispatch('*',*)方法调用

### mapActions

映射actions
import { mapActions } from 'vuex'
...
methods:{
  ...mapActions(['*'])
}

## getters

基于state的数据
Vuex.Store({
  getters:{
    *(state){
      return *
    }
  }
})
必须有返回值

### mapGetters

映射getters
import { mapGetters } from 'vuex'
...
computed:{
  ...mapGetters(['*'])
}

## modules

src目录下创建store/modules/*.js
const state = {}
const mutations = {}
const actions = {}
const getters = {}
export default {
  //namespaced:true,
  state,
  mutations,
  actions,
  getters
}

Vuex.Store({
  modules:{
    *
  }
})
通过$store.state.*.*属性访问

### module挂载映射

默认挂载在全局
通过namespaced:true开启命名空间，挂载于module
通过$store.*['*/*']，$store.*.('*/*',*)访问
通过...map*('*',['*'])映射

## vuex持久化
src/utils目录下创建storage.js
export const getstorage = (key) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : data
}
export const setstorage = (key,obj) => {
  localStorage.setItem(key,JSON.stringify(obj))
}
export const rmstorage = (key) => {
  localStorage.removeItem(key)
}

import { getstorage,setstorage } from "@/utils/storage"
const key = *
const def = *
const state = {
    user:getstorage(key,def)
}
const mutations = {
  setuser(state,data){
    state.user = data
    setstorage(key,data)
  }
}

# json-server
api接口服务工具

## 安装
npm i json-server -g

## 配置
将数据存入db/index.json

## 运行
json-server index.json

# 请求封装
将所有请求函数从页面中抽离并封装为模块

## 安装axios
npm i axios
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

## 配置实例
src/utils目录下创建request.js

import axios from 'axios'
const instance = axios.create({
  baseURL:,
  timeout:,
  headers:
})
instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response) {
    const res = response.data
    if(res.status != 200){
      return Promise.reject(res.message)
    }
    return res
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default instance

##配置api模块
src目录下创建api/*.js

import request from '@/utils/request.js'
export const getapi = data => request.get('/url',data)
export const postapi = data => request.post('/url',data)

## loading封装
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //onloading
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response) {
    //offloading
    const res = response.data
    if(res.status != 200){
      return Promise.reject(res.message)
    }
    return res
  },
  function (error) {
    return Promise.reject(error)
  }
)

## 请求头token
instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = store.state.user.user.token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

# vant-ui
移动端ui组件库
文档：https://vant-ui.github.io/vant/v2/#/zh-CN/

# 移动适配
100vw为屏幕宽

## postcss
自动将px转为vw

### 安装
npm i postcss-px-to-viewport -D --legacy-peer-deps

### 配置
根目录创建postcss.config.js

module.exports={
  plugins:{
    'postcss-px-to-viewport':{
      viewportWidth:375
    }
  }
}

