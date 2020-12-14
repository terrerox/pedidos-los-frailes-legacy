export default {
  state: {
    cart: []
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
        id: product.id,
        quantity: 1
      })
    },

    removeProductFromCart (state, index) {
      state.cart.splice(index, 1)
    },

    emptyCart (state) {
      state.cart = []
    }
  },
  actions: {
    addProductToCart (context, product) {
      const item = context.state.cart.find(item => item.id === product.id)

      if (item) {
        context.commit('incrementProductQuantity', item)
      } else {
        context.commit('addProductToCart', product)
      }
    },

    incrementProductQuantity (context, cartItem) {
      const item = context.state.cart.find(product => product.id === cartItem.id)
      if (item) {
        context.commit('incrementProductQuantity', item)
      }
    },

    decrementProductQuantity (context, cartItem) {
      const item = context.state.cart.find(product => product.id === cartItem.id)
      if (!item || item.quantity < 1) {
        return
      }
      if (item.quantity === 1) {
        context.commit('removeProductFromCart', item.indexOf)
      } else {
        context.commit('decrementProductQuantity', item)
      }
    },

    removeProductFromCart (context, index) {
      context.commit('removeProductFromCart', index)
    }

  },
  getters: {
    productsOnCart (state, getters, rootState) {
      return state.cart.map((item) => {
        const product = rootState.products.find(
          (product) => product.id === item.id
        )
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: item.quantity
        }
      })
    },

    cartTotal (state, getters) {
      return getters.productsOnCart.reduce(
        (total, current) => total + current.price * current.quantity,
        0
      )
    }
  }
}
