import accountService from '@/services/account'
import localService from '@/services/local'
import deliveryService from '@/services/delivery'

export const state = () => ({
  status: {},
  userToken: null
})

export const mutations = {
  setLogged (state, loggedUser) {
    state.loggedUser = loggedUser
  },
  loginRequest (state, user) {
    state.status = { loggingIn: true }
    state.user = user
  },
  loginSuccess (state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginFailure (state) {
    state.status = { loggedIn: false }
    state.user = null
  },
  logout (state) {
    state.status = { loggedIn: false }
    state.user = null
  },
  registerRequest (state, user) {
    state.status = { registering: true }
  },
  registerSuccess (state, user) {
    state.status = {}
  },
  registerFailure (state, error) {
    state.status = {}
  }
}

export const actions = {
  login ({ dispatch, commit }, { userName, password }) {
    commit('loginRequest', { userName })

    this.$auth.loginWith('local', { data: { userName, password } })
      .then(
        (resp) => {
          const user = resp.data
          this.$auth.setUser(user)
          commit('loginSuccess', user)
          if (user.role === 'Local') {
            localService.getLogged(this.$api).then((res) => {
              res.notFound
                ? this.$router.push(`/local/${user.id}/info`)
                : this.$router.push(`/local/${user.id}/products`)
            })
          } else if (user.role === 'Delivery') {
            deliveryService.getLogged(this.$api).then((res) => {
              res.notFound
                ? this.$router.push(`/delivery/${user.id}/info`)
                : this.$router.push(`/delivery/${user.id}/orders`)
            })
          } else {
            this.$router.push(`/admin/${user.id}`)
          }
        }
      )
      .catch((error) => {
        const { message } = error.response.data
        commit('loginFailure', message)
        dispatch('alert/error', message, { root: true })
      })
  },
  logout ({ commit }) {
    this.$auth.logout()
    commit('logout')
  },
  register ({ dispatch, commit }, userData) {
    commit('registerRequest', userData)
    const { userName, password } = userData

    accountService.register(userData, this.$api)
      .then(
        (user) => {
          dispatch('alert/success',
            '¡Registrado con éxito! Espere un momento...',
            { root: true }
          )
          dispatch('login', { userName, password })
          commit('registerSuccess', user)
        },
        (error) => {
          const { message } = error.response.data
          commit('registerFailure', message)
          dispatch('alert/error', message, { root: true })
        }
      )
  },
  updateAccount ({ dispatch }, account) {
    return accountService.update(account, this.$api)
      .then(
        () => {
          dispatch('alert/success',
            '¡Actualizado con éxito!',
            { root: true }
          )
        },
        (error) => {
          const { message } = error.response.data
          dispatch('alert/error', message, { root: true })
        }
      )
  },
  getLogged ({ commit }) {
    accountService.getLogged(this.$api)
      .then(res => commit('setLogged', res))
  }
}

export const getters = {
  loggedUser (state, getters, rootState) {
    return state.loggedUser
  }
}
