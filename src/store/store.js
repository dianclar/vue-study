import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        data:123
    },
    modules:{
        user
    }
})
export default store