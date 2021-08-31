import accountService from '@/services/account'
import localService from '@/services/local'
import deliveryService from '@/services/delivery'

let user

if (process.browser) {
  user = JSON.parse(localStorage.getItem('account'))
}

export const state = () => (
  user
    ? { status: { loggedIn: true }, user, loggedUser: {} }
    : { status: {}, user: null }
)

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
    state.status = {}
    state.user = null
  },
  logout (state) {
    state.status = {}
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

    accountService.login(userName, password)
      .then(
        (user) => {
          commit('loginSuccess', user)
          if (user.role === 'Local') {
            localService.getLogged().then((res) => {
              res.notFound
                ? this.$router.push('/local-info')
                : this.$router.push(`/local/${user.id}/products`)
            })
          } else if (user.role === 'Delivery') {
            deliveryService.getLogged().then((res) => {
              res.notFound
                ? this.$router.push('/delivery-info')
                : this.$router.push(`/delivery/${user.id}/orders`)
            })
          } else {
            this.$router.push(`/admin/${user.id}`)
          }
        },
        (error) => {
          commit('loginFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  logout ({ commit }) {
    accountService.logout()
    commit('logout')
  },
  register ({ dispatch, commit }, userData) {
    commit('registerRequest', userData)
    const { userName, password } = userData

    accountService.register(userData)
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
          commit('registerFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  updateAccount ({ dispatch }, account) {
    return accountService.update(account)
      .then(
        () => {
          dispatch('alert/success',
            '¡Actualizado con éxito!',
            { root: true }
          )
        },
        (error) => {
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  getLogged ({ commit }) {
    accountService.getLogged()
      .then(res => commit('setLogged', res))
  }
}

export const getters = {
  loggedUser (state, getters, rootState) {
    return state.loggedUser
  }
}
