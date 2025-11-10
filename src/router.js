import VueRouter from 'vue-router'
import music from '@/views/music.vue'
import ruok from '@/views/ruok.vue'
import two from './views/two.vue'
import Vue from 'vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes:[ 
    {path:'/music/:music?',component:music},
    {path:'/ruok',component:ruok,redirect:'/two',
        children:[
            {path:'/two',component:two}
        ]
    }
  ]
})
export default router