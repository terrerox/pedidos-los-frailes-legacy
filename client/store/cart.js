export const state = () => ({
  cart: []
})

export const mutations = {
  incrementProductQuantity (state, item) {
    item.quantity++
  },

  decrementProductQuantity (state, item) {
    item.quantity--
  },

  addProductToCart (state, product) {
    state.cart.push({
      product,
      quantity: 1
    })
  },

  removeProductFromCart (state, id) {
    state.cart = state.cart.filter(cart => cart.product.id !== id)
  },

  emptyCart (state) {
    state.cart = []
  }
}

export const actions = {
  addProductToCart (context, product) {
    const item = context.state.cart.find(item => item.product.id === product.id)

    if (item) {
      context.commit('incrementProductQuantity', item)
    } else {
      context.commit('addProductToCart', product)
    }
  },

  incrementProductQuantity (context, cartItem) {
    const item = context.state.cart.find(item => item.product.id === cartItem.product.id)
    if (item) {
      context.commit('incrementProductQuantity', item)
    }
  },

  decrementProductQuantity (context, cartItem) {
    const item = context.state.cart.find(item => item.product.id === cartItem.product.id)
    if (!item || item.quantity < 1) {
      return
    }
    if (item.quantity === 1) {
      context.commit('removeProductFromCart', item.product.id)
    } else {
      context.commit('decrementProductQuantity', item)
    }
  },

  removeProductFromCart (context, index) {
    context.commit('removeProductFromCart', index.product.id)
  }
}

export const getters = {
  productsOnCart (state, getters, rootState) {
    return state.cart
  },

  cartTotal (state, getters) {
    return state.cart.reduce(
      (total, current) => total + current.product.price * current.quantity,
      0
    )
  }
}
