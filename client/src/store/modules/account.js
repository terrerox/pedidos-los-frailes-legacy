import accountService from '@/account/services/account'
import router from '@/router'

const local = JSON.parse(localStorage.getItem('local'))
const state = local
  ? { status: { loggedIn: true }, local }
  : { status: {}, local: null }

const mutations = {
  loginRequest (state, local) {
    state.status = { loggingIn: true }
    state.local = local
  },
  loginSuccess (state, local) {
    state.status = { loggedIn: true }
    state.local = local
  },
  loginFailure (state) {
    state.status = {}
    state.local = null
  },
  logout (state) {
    state.status = {}
    state.local = null
  },
  registerRequest (state, local) {
    state.status = { registering: true }
  },
  registerSuccess (state, local) {
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
        local => {
          commit('loginSuccess', local)
          router.push(`/local/${local.id}`)
        },
        error => {
          commit('loginFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  logout ({ commit }) {
    accountService.logout()
    router.push('/login')
    commit('logout')
  },
  register ({ dispatch, commit }, local) {
    commit('registerRequest', local)

    accountService.register(local)
      .then(
        local => {
          commit('registerSuccess', local)
          router.push('/login')
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'Registration successful', { root: true })
          })
        },
        error => {
          commit('registerFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  }
}

export const account = {
  namespaced: true,
  state,
  mutations,
  actions
}
