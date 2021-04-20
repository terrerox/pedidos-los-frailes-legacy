import deliveryService from '@/delivery/services/delivery'

const state = {
  deliveries: []
}

const mutations = {
  setDeliveries (state, deliveries) {
    state.deliveries = deliveries
  },
  removeDelivery (state, id) {
    state.deliveries = state.deliveries.filter(delivery => delivery.id !== id)
  }
}
const actions = {
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
  }
}
const getters = {
  activeDeliveries (state) {
    return state.deliveries.filter(delivery => delivery.status === 'active')
  }
}

export const delivery = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
