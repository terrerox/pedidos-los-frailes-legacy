import productService from '@/services/product'
export default {
  state: {
    products: []
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    removeProduct (state, index) {
      state.products.splice(index, 1)
    }
  },
  actions: {
    getProducts (context, id) {
      return productService.getAll()
        .then(res => {
          const currentResProducts = res.filter(product => product.restaurantId === id)
          context.commit('setProducts', currentResProducts)
        })
    },
    addProduct ({ commit }, product) {
      return productService.addProduct(product)
        .then(() => {
          this.dispatch('getProducts', product.restaurantId)
        })
    },
    deleteProduct ({ commit }, { id, index }) {
      return productService.deleteProduct(id)
        .then(() => {
          commit('removeProduct', index)
        })
    }
  },
  getters: {
    products (state) {
      return state.products
    }
  }
}
