import orderService from '@/orders/services/order'

const state = {
  orders: [],
  deliveryOrders: [],
  order: {}
}

const mutations = {
  setOrders (state, orders) {
    state.orders = orders
  },
  setDeliveryOrders (state, orders) {
    state.deliveryOrders = orders
  },
  setOrder (state, order) {
    state.order = order
  },
  addOrders (state, order) {
    state.orders.push({ order })
  },
  removeOrder (state, id) {
    state.orders = state.orders.filter(order => order.id !== id)
  },
  removeDeliveryOrder (state, id) {
    state.deliveryOrders = state.deliveryOrders.filter(order => order.id !== id)
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

  getDeliveryOrders ({ commit }, id) {
    let ordersArray = []
    return orderService.deliveryOrders()
      .then(res => {
        res.map(order => {
          const { cartItems, ...orders } = order
          const cartItemsJson = JSON.parse(cartItems)
          orders.cartItems = cartItemsJson
          ordersArray = [...ordersArray, orders]
        })
        commit('setDeliveryOrders', ordersArray)
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
    return orderService.update(order)
  },

  deleteOrder ({ commit }, id) {
    return orderService.deleteOrder(id).then(() => {
      commit('removeOrder', id)
    })
  },

  deleteDeliveryOrder ({ commit }, { id }) {
    return orderService.deleteOrder(id).then(() => {
      commit('removeDeliveryOrder', id)
    })
  }
}

const getters = {
  orders (state) {
    return state.orders
  },
  deliveryOrders (state) {
    return state.deliveryOrders
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
