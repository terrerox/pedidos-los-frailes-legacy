import orderService from '@/services/order'
export default {
  state: {
    orders: []
  },
  mutations: {
    setOrders (state, orders) {
      state.orders = orders
    },
    addOrders (state, order) {
      console.log(order)
      state.orders.push({ order })
    }
  },
  actions: {
    getOrders ({ commit }, id) {
      return orderService.getAll()
        .then(res => {
          const orders = res.filter(order => order.restaurantId === id)
          commit('setOrders', orders)
        })
    },
    addOrder ({ commit }, order) {
      return orderService.addOrder(order)
    }
  },
  getters: {
    order (state) {
      return state.orders
    }
  }
}
