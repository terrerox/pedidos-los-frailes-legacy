import orderService from '@/services/order'

export const state = () => ({
  orders: [],
  deliveryOrders: [],
  order: {},
  status: { isLoading: false }
})

export const mutations = {
  orderRequest (state, ctx) {
    state.status = { isLoading: true }
  },
  orderFinishedRequest (state, ctx) {
    state.status = { isLoading: false }
  },
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

export const actions = {
  getOrders ({ commit }, id) {
    commit('orderRequest')
    let ordersArray = []
    return orderService.loggedOrders()
      .then((res) => {
        res.forEach((order) => {
          const { cartItems, ...orders } = order
          const cartItemsJson = JSON.parse(cartItems)
          orders.cartItems = cartItemsJson
          ordersArray = [...ordersArray, orders]
        })
        commit('orderFinishedRequest')
        commit('setOrders', ordersArray)
      })
  },

  getDeliveryOrders ({ commit }, id) {
    commit('orderRequest')
    let ordersArray = []
    return orderService.deliveryOrders()
      .then((res) => {
        res.forEach((order) => {
          const { cartItems, ...orders } = order
          const cartItemsJson = JSON.parse(cartItems)
          orders.cartItems = cartItemsJson
          ordersArray = [...ordersArray, orders]
        })
        commit('orderFinishedRequest')
        commit('setDeliveryOrders', ordersArray)
      })
  },

  getOrder ({ commit }, id) {
    commit('orderRequest')
    return orderService.getById(id)
      .then((order) => {
        const { cartItems, ...orders } = order
        const cartItemsJson = JSON.parse(cartItems)
        orders.cartItems = cartItemsJson
        commit('setOrder', orders)
        commit('orderFinishedRequest')
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

export const getters = {
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
