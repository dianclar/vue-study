import { getstorage,setstorage } from "@/utils/storage"
const key = 'key123'
const def = '123'
const state = {
    user:getstorage(key,def)
}
const mutations = {
  setuser(state,data){
    state.user = data
    setstorage(key,data)
  }
}
const actions = {}
const getters = {
  userup(state){
    return state.user + 'up'
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}