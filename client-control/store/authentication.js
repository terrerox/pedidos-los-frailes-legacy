import accountService from '@/services/account'
import localService from '@/services/local'
import deliveryService from '@/services/delivery'

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
  async login ({ commit }, payload) {
    const { email } = payload
    try {
      commit('request')
      await this.$magic.auth.loginWithMagicLink({ email })
      const userData = await this.$magic.user.getMetadata()
      const { token, role } = await accountService.join(this.$api, payload.email, payload.role)
      commit('setUserData', { role, ...userData })
      commit('setToken', token)
      this.$api.setToken(token, 'Bearer')
      if (role === 'Local') {
        localService.getLogged(this.$api).then((res) => {
          res.notFound
            ? this.$router.push('/local/info')
            : this.$router.push('/local/products')
        })
      } else if (role === 'Delivery') {
        deliveryService.getLogged(this.$api).then((res) => {
          res.notFound
            ? this.$router.push('/delivery/info')
            : this.$router.push('/delivery/orders')
        })
      } else {
        this.$router.push('/admin')
      }
      commit('endRequest')
    } catch (err) {
      commit('endRequest')
    }
  },
  async logout ({ commit }) {
    try {
      commit('request')
      await this.$magic.user.logout()
      commit('clearUserData')
      this.$router.push('/')
      commit('endRequest')
    } catch (error) {
      commit('endRequest')
    }
  }
}
