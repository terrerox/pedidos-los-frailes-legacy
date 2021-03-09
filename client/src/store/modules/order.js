import orderService from '@/orders/services/order'

const state = {
  orders: []
}

const mutations = {
  setOrders (state, orders) {
    state.orders.push(orders)
  },
  addOrders (state, order) {
    state.orders.push({ order })
  },
  removeOrder (state, index) {
    state.orders.splice(index, 1)
  }
}

const actions = {
  getOrders ({ commit }, id) {
    return orderService.loggedOrders()
      .then(res => {
        res.map(order => {
          const { cartItems, ...orders } = order
          const cartItemsJson = JSON.parse(cartItems)
          orders.cartItems = cartItemsJson
          commit('setOrders', orders)
        })
      })
  },

  addOrder ({ commit }, orderWithCartItems) {
    const { cartItems, ...order } = orderWithCartItems
    const cartItemsString = JSON.stringify(cartItems)
    order.cartItems = cartItemsString
    return orderService.addOrder(order)
  },

  deleteOrder ({ commit }, { id, index }) {
    return orderService.deleteOrder(id).then(() => {
      commit('removeOrder', index)
    })
  }
}

const getters = {
  order (state) {
    return state.orders
  }
}

export const order = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
