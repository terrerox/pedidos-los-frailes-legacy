import localService from '@/services/local'

export const state = () => ({
  locals: [],
  currentLocal: {},
  status: { isLoading: false }
})

export const mutations = {
  localRequest (state, ctx) {
    state.status = { isLoading: true }
  },
  localFinishedRequest (state, ctx) {
    state.status = { isLoading: false }
  },
  setLocals (state, locals) {
    state.locals = locals
  },
  setCurrentLocal (state, local) {
    state.currentLocal = local
  }
}

export const actions = {
  getLocals ({ commit }) {
    return localService.getAll(this.$axios)
      .then((res) => {
        commit('setLocals', res)
      })
      .catch(err => console.log(err))
  },
  getLocal ({ commit }, id) {
    commit('localRequest')
    return localService.getById(id, this.$axios)
      .then((res) => {
        commit('setCurrentLocal', res)
        commit('localFinishedRequest')
      })
      .catch(err => console.log(err))
  }
}

export const getters = {
  locals (state) {
    return state.locals
  },
  currentLocal (state) {
    return state.currentLocal
  },
  loggedLocal (state, getters, rootState) {
    return state.loggedLocal
  }
}
