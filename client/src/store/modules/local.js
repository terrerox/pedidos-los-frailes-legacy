import localService from '@/locals/services/local'
import router from '@/router'

const state = {
  locals: [],
  currentLocal: {},
  status: { isLoading: false },
  loggedLocal: {}
}

const mutations = {
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
  },
  setLoggedLocal (state, local) {
    state.loggedLocal = local
  },
  setEditedLocal (state, editedLocal) {
    const {
      title,
      image,
      category,
      description,
      address,
      phoneNumber
    } = editedLocal

    const { Local } = state.loggedLocal
    Local.title = title
    Local.category = category
    Local.description = description
    Local.address = address
    Local.phoneNumber = phoneNumber
    Local.image = image
  }
}

const actions = {
  createLocal ({ commit }, local) {
    return localService.create(local)
      .then(res => router.push(`/local/${res.id}`))
  },
  getLocals ({ commit }) {
    return localService.getAll()
      .then(res => {
        commit('setLocals', res)
      })
  },
  getLocal ({ commit }, id) {
    commit('localRequest')
    return localService.getById(id)
      .then(res => {
        commit('setCurrentLocal', res)
        commit('localFinishedRequest')
      })
  },
  getLoggedLocal ({ commit }, id) {
    return localService.getLogged()
      .then(res => {
        commit('setLoggedLocal', res)
      })
  },
  updateLocal ({ commit, dispatch }, local) {
    return localService.update(local)
      .then(
        res => {
          commit('setEditedLocal', res)
          dispatch('alert/success',
            '¡Actualizado con éxito!',
            { root: true }
          )
        },
        error => {
          dispatch('alert/error', error, { root: true })
        }
      )
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
