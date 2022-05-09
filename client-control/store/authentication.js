import { magic } from '../plugins/magic'
import accountService from '@/services/account'

export const state = () => ({
  user: {},
  authenticated: false,
  token: '',
  isLoading: false
})

export const mutations = {
  setUserData (state, userData) {
    state.user = userData
    state.authenticated = true
  },
  clearUserData (state) {
    state.user = {}
    state.token = ''
    state.authenticated = false
    this.$router.push('/')
  },
  setToken (state, token) {
    state.token = token
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
      await magic.auth.loginWithMagicLink({ email })
      const userData = await magic.user.getMetadata()
      commit('setUserData', userData)
      const { token } = await accountService.join(this.$api, email, 'Client')
      commit('setToken', token)
      commit('endRequest')
      this.$router.push('/')
    } catch (err) {
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
