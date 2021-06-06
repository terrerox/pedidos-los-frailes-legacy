import accountService from '@/account/services/account'
import localService from '@/locals/services/local'
import deliveryService from '@/delivery/services/delivery'
import router from '@/router'

const user = JSON.parse(localStorage.getItem('account'))
const state = user
  ? { status: { loggedIn: true }, user, loggedUser: {} }
  : { status: {}, user: null }

const mutations = {
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

const actions = {
  login ({ dispatch, commit }, { email, password }) {
    commit('loginRequest', { email })

    accountService.login(email, password)
      .then(
        user => {
          commit('loginSuccess', user)
          if (user.role === 'Local') {
            localService.getLogged().then(res => {
              res.notFound
                ? router.push('/local-info')
                : router.push(`/local/${user.id}`)
            })
          } else if (user.role === 'Delivery') {
            deliveryService.getLogged().then(res => {
              res.notFound
                ? router.push('/delivery-info')
                : router.push(`/delivery/${user.id}`)
            })
          } else {
            router.push(`/admin/${user.id}`)
          }
        },
        error => {
          commit('loginFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  logout ({ commit }) {
    accountService.logout()
    commit('logout')
  },
  register ({ dispatch, commit }, user) {
    commit('registerRequest', user)

    accountService.register(user)
      .then(
        user => {
          commit('registerSuccess', user)
          dispatch('alert/success',
            '¡Registrado con éxito, inicia sesión!',
            { root: true }
          )
        },
        error => {
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
        error => {
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  getLogged ({ commit }) {
    accountService.getLogged()
      .then(res => commit('setLogged', res))
  }
}

const getters = {
  loggedUser (state, getters, rootState) {
    return state.loggedUser
  }
}

export const account = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
