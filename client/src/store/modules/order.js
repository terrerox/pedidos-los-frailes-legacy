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
    },
    removeOrder (state, index) {
      state.orders.splice(index, 1)
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
    },

    deleteOrder ({ commit }, { id, index }) {
      return orderService.deleteOrder(id).then(() => {
        commit('removeOrder', index)
      })
    }
  },
  getters: {
    order (state) {
      return state.orders
    }
  }
}
