import localService from '@/locals/services/local'

const state = {
  locals: [],
  currentLocal: {},
  loggedLocal: {}
}

const mutations = {
  setLocals (state, locals) {
    state.locals = locals
  },
  setCurrentLocal (state, local) {
    state.currentLocal = local
  },
  setLoggedLocal (state, local) {
    state.loggedLocal = local
  }
}

const actions = {
  getLocals ({ commit }) {
    return localService.getAll()
      .then(res => {
        commit('setLocals', res)
      })
  },
  getLocal (context, id) {
    return localService.getById(id)
      .then(res => {
        context.commit('setCurrentLocal', res)
      })
  },
  getLoggedLocal (context, id) {
    return localService.getCurrent()
      .then(res => {
        context.commit('setLoggedLocal', res)
      })
  },
  updateLocal (context, local) {
    return localService.update(local)
      .then(res => {
        context.commit('setLoggedLocal', res)
      })
  }
}

const getters = {
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

export const local = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
