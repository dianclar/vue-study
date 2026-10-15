import VueRouter from 'vue-router'
import ruok from '@/views/ruok.vue'
import two from './views/two.vue'
import Vue from 'vue'
import store from './store/store'

const music = () => import('@/views/music.vue')
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/' },
    { path: '/music/:music?', component: music },
    {
      path: '/ruok',
      component: ruok,
      redirect: '/two',
      children: [{ path: '/two', component: two }],
    },
    { path: '*', component: () => import('./views/nopath.vue') },
  ],
})

const nologinlist = ['/login']
const token = true || !store.state.user.user.token
router.beforeEach((to, from, next) => {
  if (!nologinlist.includes(to.path) && !token) {
    next('/login')
  }
  next()
})

export default router
