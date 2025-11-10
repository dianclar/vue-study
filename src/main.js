//导入vue核心包
import Vue from 'vue'
//导入app组件
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import router from './router'
import store from '@/store/store'
Vue.component('HelloWorld', HelloWorld)
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
  router,
  store
}).$mount('#app')
