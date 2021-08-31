import localService from '@/services/local'

export const state = () => ({
  locals: [],
  currentLocal: {},
  status: { isLoading: false },
  loggedLocal: {}
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
  },
  setLoggedLocal (state, local) {
    state.loggedLocal = local
  },
  setEditedLocal (state, editedLocal) {
    const {
      title,
      imageUrl,
      category,
      description,
      address,
      phoneNumber,
      status
    } = editedLocal

    const { Local } = state.loggedLocal
    Local.title = title
    Local.category = category
    Local.description = description
    Local.address = address
    Local.phoneNumber = phoneNumber
    Local.imageUrl = imageUrl
    Local.status = status
  },
  setVerifiedLocal (state, verifiedLocal) {
    const local = state.locals.find(local => local.accountId === verifiedLocal.accountId)
    local.status = verifiedLocal.status
  }
}

export const actions = {
  createLocal ({ commit, dispatch }, local) {
    commit('localRequest')
    return localService.create(local)
      .then((res) => {
        this.$router.push(`/local/${res.id}`)
        commit('localFinishedRequest')
      },
      (error) => {
        commit('localFinishedRequest')
        dispatch('alert/error', error, { root: true })
      })
  },
  getLocals ({ commit }) {
    return localService.getAll()
      .then((res) => {
        commit('setLocals', res)
      })
  },
  getLocal ({ commit }, id) {
    commit('localRequest')
    return localService.getById(id)
      .then((res) => {
        commit('setCurrentLocal', res)
        commit('localFinishedRequest')
      })
  },
  getLoggedLocal ({ commit }) {
    commit('localRequest')
    return localService.getLogged()
      .then((res) => {
        commit('setLoggedLocal', res)
        commit('localFinishedRequest')
      })
  },
  updateLocal ({ commit, dispatch }, local) {
    commit('localRequest')
    return localService.update(local)
      .then(
        (res) => {
          commit('setEditedLocal', res)
          commit('localFinishedRequest')
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
  verifyLocal ({ commit, dispatch }, local) {
    commit('localRequest')
    return localService.update(local)
      .then(
        (res) => {
          commit('setVerifiedLocal', res)
          commit('localFinishedRequest')
          dispatch('alert/success',
            '¡Verificado con éxito!',
            { root: true }
          )
        },
        (error) => {
          dispatch('alert/error', error, { root: true })
        }
      )
  }
}

export const getters = {
  verifiedLocals (state) {
    return state.locals.filter(local => local.status === 'active')
  },
  unverifiedLocals (state) {
    return state.locals.filter(local => local.status === 'inactive')
  },
  currentLocal (state) {
    return state.currentLocal
  },
  loggedLocal (state, getters, rootState) {
    return state.loggedLocal
  }
}
