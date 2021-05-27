const state = {
  type: null,
  message: null
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

const actions = {
  success ({ commit }, message) {
    commit('success', message)
    setTimeout(() => {
      commit('clear')
    }, 5000)
  },
  error ({ commit }, message) {
    commit('error', message)
    setTimeout(() => {
      commit('clear')
    }, 5000)
  },
  clear ({ commit }) {
    commit('clear')
  }
}

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations
}
