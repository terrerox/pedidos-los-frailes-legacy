
export default {
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    incrementProductQuantity (state, item) {
      item.quantity++
    },

    decrementProductQuantity (state, item) {
      item.quantity--
    },

    addProductToCart (state, product) {
      state.cart.push({
        product: product,
        quantity: 1
      })
      console.log(state.cart)
    },

    removeProductFromCart (state, index) {
      state.cart.splice(index, 1)
    },

    emptyCart (state) {
      state.cart = []
    },

    setStorage ({ cart }) {
      const cartItems = JSON.stringify(cart)
      localStorage.setItem('cart', cartItems)
    }
  },
  actions: {
    addProductToCart (context, product) {
      const item = context.state.cart.find(item => item.product.id === product.id)

      if (item) {
        context.commit('incrementProductQuantity', item)
      } else {
        context.commit('addProductToCart', product)
      }
      context.commit('setStorage')
    },

    incrementProductQuantity (context, cartItem) {
      const item = context.state.cart.find(item => item.product.id === cartItem.product.id)
      if (item) {
        context.commit('incrementProductQuantity', item)
      }
      context.commit('setStorage')
    },

    decrementProductQuantity (context, cartItem) {
      const item = context.state.cart.find(item => item.product.id === cartItem.product.id)
      if (!item || item.quantity < 1) {
        return
      }
      if (item.quantity === 1) {
        context.commit('removeProductFromCart', item.indexOf)
      } else {
        context.commit('decrementProductQuantity', item)
      }
      context.commit('setStorage')
    },

    removeProductFromCart (context, index) {
      context.commit('removeProductFromCart', index)
      context.commit('setStorage')
    }

  },
  getters: {
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
}
