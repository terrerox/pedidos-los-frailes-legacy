import { magic } from '../plugins/magic'

export const state = () => ({
  user: {},
  authenticated: false
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
  }
}

export const actions = {
  async login ({ commit }, email) {
    await magic.auth.loginWithMagicLink(email)
    const userData = await magic.user.getMetadata()
    commit('setUserData', userData)
  },
  async logout ({ commit }) {
    await magic.user.logout()
    commit('clearUserData')
  }
}
