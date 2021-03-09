import productService from '@/shop/services/product'

const state = {
  products: [],
  product: {}
}

const mutations = {
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
      category,
      prepTimeUnit,
      prepTimeValue,
      price
    } = editedProduct

    const product = state.products.find(product => product.id === id)
    product.title = title
    product.category = category
    product.prepTimeUnit = prepTimeUnit
    product.prepTimeValue = prepTimeValue
    product.price = price
    product.image = image
  }
}

const actions = {
  getLoggedProducts (context, id) {
    return productService.getLoggedProducts()
      .then(products => {
        context.commit('setProducts', products)
      })
  },
  addProduct ({ commit }, product) {
    return productService.addProduct(product).then(res => {
      commit('addProduct', res)
    })
  },
  updateProduct ({ commit }, product) {
    return productService.updateProduct(product).then(res => {
      commit('setEditedProduct', res)
    })
  },
  deleteProduct ({ commit }, { id, index }) {
    return productService.deleteProduct(id).then(() => {
      commit('removeProduct', index)
    })
  }
}

const getters = {
  loggedProducts (state) {
    return state.products
  },
  product (state) {
    return state.product
  }
}

export const product = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
