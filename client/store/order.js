import orderService from '@/services/order'

export const state = () => ({
  orders: [],
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
  removeOrder (state, id) {
    state.orders = state.orders.filter(order => order.id !== id)
  }
}

export const actions = {
  addOrder ({ commit }, orderWithCartItems) {
    const { cartItems, ...order } = orderWithCartItems
    const cartItemsString = JSON.stringify(cartItems)
    order.cartItems = cartItemsString
    return orderService.addOrder(order, this.$api)
  },

  updateOrder ({ commit }, order) {
    return orderService.update(order, this.$api)
  },

  deleteOrder ({ commit }, id) {
    return orderService.deleteOrder(id, this.$api).then(() => {
      commit('removeOrder', id)
    })
  }
}

export const getters = {
  orders (state) {
    return state.orders
  },
  order (state) {
    return state.order
  }
}
