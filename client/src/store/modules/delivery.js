import deliveryService from '@/delivery/services/delivery'
import router from '@/router'

const state = {
  deliveries: [],
  loggedDelivery: {}
}

const mutations = {
  setDeliveries (state, deliveries) {
    state.deliveries = deliveries
  },
  removeDelivery (state, id) {
    state.deliveries = state.deliveries.filter(delivery => delivery.id !== id)
  },
  setLoggedDelivery (state, delivery) {
    state.loggedDelivery = delivery
  }
}
const actions = {
  createDelivery ({ commit }, delivery) {
    return deliveryService.create(delivery)
      .then(res => router.push(`/delivery/${res.id}`))
  },
  getDeliveries (context) {
    return deliveryService.getAll()
      .then(deliveries => {
        context.commit('setDeliveries', deliveries)
      })
  },
  updateDelivery ({ commit }, delivery) {
    return deliveryService.update(delivery).then(res => {
      commit('removeDelivery', res.accountId)
    })
  },
  getLoggedDelivery (context, id) {
    return deliveryService.getLogged()
      .then(res => {
        context.commit('setLoggedDelivery', res)
      })
  }
}
const getters = {
  activeDeliveries (state) {
    return state.deliveries.filter(delivery => delivery.status === 'active')
  },
  loggedDelivery (state, getters, rootState) {
    return state.loggedDelivery
  }
}

export const delivery = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
