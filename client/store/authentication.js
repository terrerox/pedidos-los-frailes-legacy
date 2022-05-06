import { magic } from '../plugins/magic'

export const state = () => ({
  user: {},
  authenticated: false,
  isLoading: false
})

export const mutations = {
  setUserData (state, userData) {
    state.user = userData
    state.authenticated = true
  },
  clearUserData (state) {
    state.user = {}
    state.authenticated = false
    this.$router.push('/')
  },
  request (state, ctx) {
    state.isLoading = true
  },
  endRequest (state, ctx) {
    state.isLoading = false
  }
}

export const actions = {
  async login ({ commit }, email) {
    try {
      commit('request')
      await magic.auth.loginWithMagicLink(email)
      const userData = await magic.user.getMetadata()
      commit('setUserData', userData)
      commit('endRequest')
      this.$router.push('/')
    } catch (err) {
      console.log(err)
      commit('endRequest')
    }
  },
  async logout ({ commit }) {
    try {
      commit('request')
      await magic.user.logout()
      commit('clearUserData')
      commit('endRequest')
    } catch (error) {
      commit('endRequest')
    }
  }
}
