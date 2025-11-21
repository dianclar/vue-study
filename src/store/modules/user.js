const state = {
    user:'usermodule'
}
const mutations = {}
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