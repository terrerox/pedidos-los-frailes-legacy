export default {
  state: {
    orders: []
  },
  mutations: {
    addOrders (state, order) {
      state.orders.push(order)
      console.log(state.orders)
    }
  },
  actions: {
    addOrder ({ commit }, order) {
      commit('addOrders', order)
    }
  }
}
