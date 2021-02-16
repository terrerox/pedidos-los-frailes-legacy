import orderService from '@/services/order'

const state = {
  orders: []
}

const mutations = {
  setOrders (state, orders) {
    state.orders = orders
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
    return orderService.getAll()
      .then(res => {
        const orders = res.filter(order => order.RestaurantId === id)
        commit('setOrders', orders)
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
  state,
  mutations,
  actions,
  getters
}
