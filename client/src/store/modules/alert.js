const state = {
  type: null,
  message: null
}

const actions = {
  success ({ commit }, message) {
    commit('success', message)
  },
  error ({ commit }, message) {
    commit('error', message)
  },
  clear ({ commit }) {
    commit('clear')
  }
}

const mutations = {
  success (state, message) {
    state.type = 'Exito'
    state.message = message
  },
  error (state, message) {
    state.type = 'Error'
    state.message = message
  },
  clear (state) {
    state.type = null
    state.message = null
  }
}

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations
}