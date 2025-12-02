import VueRouter from 'vue-router'
import ruok from '@/views/ruok.vue'
import two from './views/two.vue'
import Vue from 'vue'
import store from './store/store'
const music = () => import('@/views/music.vue')
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/music/:music?', component: music },
    { path: '/ruok', component: ruok, redirect: '/two', children: [{ path: '/two', component: two }] }
  ]
})

const userhrmllist = ['*']
router.beforeEach((to, from, next) => {
  if(userhrmllist.includes(to.path)){
    if(!store.state.user.user.token){
      next('/login')
    }
  }
  next()
})

export default router
