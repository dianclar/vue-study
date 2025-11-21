import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    data: 123
  },
  getters: {
    eyedata(state) {
      return state.data + 1
    }
  },
  modules: {
    user
  }
})
export default store
