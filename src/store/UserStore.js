// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    users: [] // This will store registered users
  },
  mutations: {
    ADD_USER(state, user) {
      state.users.push(user)
    }
  },
  actions: {
    addUser({ commit }, user) {
      commit('ADD_USER', user)
    }
  },
  getters: {
    getUsers: (state) => state.users
  }
})
