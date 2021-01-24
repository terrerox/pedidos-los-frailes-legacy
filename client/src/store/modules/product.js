import productService from '@/services/product'
export default {
  state: {
    products: [],
    product: {}
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    removeProduct (state, index) {
      state.products.splice(index, 1)
    },
    addProduct (state, product) {
      state.products.push(product)
    },
    setProduct (state, productId) {
      state.product = state.products.find(product => product.id === productId)
    },
    setEditedProduct (state, editedProduct) {
      const {
        id,
        title,
        image,
        cat1,
        cat2,
        prepTimeUnit,
        prepTimeValue,
        price
      } = editedProduct

      const product = state.products.find(product => product.id === id)
      product.title = title
      product.image = image
      product.cat1 = cat1
      product.cat2 = cat2
      product.prepTimeUnit = prepTimeUnit
      product.prepTimeValue = prepTimeValue
      product.price = price
    }
  },
  actions: {
    getProducts (context, id) {
      return productService.getAll().then(res => {
        const currentResProducts = res.filter(
          product => product.restaurantId === id
        )
        context.commit('setProducts', currentResProducts)
      })
    },
    addProduct ({ commit }, product) {
      return productService.addProduct(product).then(() => {
        commit('addProduct', product)
      })
    },
    updateProduct ({ commit }, product) {
      console.log(product)
      return productService.updateProduct(product).then(res => {
        commit('setEditedProduct', res)
      })
    },
    deleteProduct ({ commit }, { id, index }) {
      return productService.deleteProduct(id).then(() => {
        commit('removeProduct', index)
      })
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    product (state) {
      return state.product
    }
  }
}
