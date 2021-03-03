import accountService from '@/account/services/account'
import router from '@/router'

const restaurant = JSON.parse(localStorage.getItem('restaurant'))
const state = restaurant
  ? { status: { loggedIn: true }, restaurant }
  : { status: {}, restaurant: null }

const mutations = {
  loginRequest (state, restaurant) {
    state.status = { loggingIn: true }
    state.restaurant = restaurant
  },
  loginSuccess (state, restaurant) {
    state.status = { loggedIn: true }
    state.restaurant = restaurant
  },
  loginFailure (state) {
    state.status = {}
    state.restaurant = null
  },
  logout (state) {
    state.status = {}
    state.restaurant = null
  },
  registerRequest (state, restaurant) {
    state.status = { registering: true }
  },
  registerSuccess (state, restaurant) {
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
        restaurant => {
          commit('loginSuccess', restaurant)
          router.push(`/restaurant/${restaurant.id}`)
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
  register ({ dispatch, commit }, restaurant) {
    commit('registerRequest', restaurant)

    accountService.register(restaurant)
      .then(
        restaurant => {
          commit('registerSuccess', restaurant)
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
