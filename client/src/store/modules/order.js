import orderService from '@/orders/services/order'

const state = {
  orders: [],
  order: {}
}

const mutations = {
  setOrders (state, orders) {
    state.orders = orders
  },
  setOrder (state, order) {
    state.order = order
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
    let ordersArray = []
    return orderService.loggedOrders()
      .then(res => {
        res.map(order => {
          const { cartItems, ...orders } = order
          const cartItemsJson = JSON.parse(cartItems)
          orders.cartItems = cartItemsJson
          ordersArray = [...ordersArray, orders]
        })
        commit('setOrders', ordersArray)
      })
  },

  getOrder ({ commit }, id) {
    return orderService.getById(id)
      .then(order => {
        const { cartItems, ...orders } = order
        const cartItemsJson = JSON.parse(cartItems)
        orders.cartItems = cartItemsJson
        commit('setOrder', orders)
      })
  },

  addOrder ({ commit }, orderWithCartItems) {
    const { cartItems, ...order } = orderWithCartItems
    const cartItemsString = JSON.stringify(cartItems)
    order.cartItems = cartItemsString
    return orderService.addOrder(order)
  },

  updateOrder ({ commit }, order) {
    return orderService.update(order).then(res => {
      console.log(res)
    })
  },

  deleteOrder ({ commit }, { id, index }) {
    return orderService.deleteOrder(id).then(() => {
      commit('removeOrder', index)
    })
  }
}

const getters = {
  orders (state) {
    return state.orders
  },
  order (state) {
    return state.order
  }
}

export const order = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
