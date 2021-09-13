import productService from '@/services/product'

export const state = () => ({
  products: [],
  product: {},
  status: { isLoading: false }
})

export const mutations = {
  productRequest (state, ctx) {
    state.status = { isLoading: true }
  },
  productFinishedRequest (state, ctx) {
    state.status = { isLoading: false }
  },
  setProducts (state, products) {
    state.products = products
  },
  removeProduct (state, id) {
    state.products = state.products.filter(product => product.id !== id)
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
      imageUrl,
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
    product.imageUrl = imageUrl
  }
}

export const actions = {
  getLoggedProducts ({ commit }, id) {
    commit('productRequest')
    return productService.getLoggedProducts()
      .then((products) => {
        commit('setProducts', products)
        commit('productFinishedRequest')
      })
  },
  addProduct ({ commit, dispatch }, product) {
    commit('productRequest')
    return productService.addProduct(product).then((res) => {
      commit('addProduct', res)
      commit('productFinishedRequest')
      dispatch('alert/success',
        '¡Agregado con éxito!',
        { root: true }
      )
    })
  },
  updateProduct ({ commit, dispatch }, product) {
    commit('productRequest')
    return productService.updateProduct(product).then((res) => {
      commit('setEditedProduct', res)
      commit('productFinishedRequest')
      dispatch('alert/success',
        '¡Actualizado con éxito!',
        { root: true }
      )
    })
  },
  deleteProduct ({ commit }, id) {
    return productService.deleteProduct(id).then(() => {
      commit('removeProduct', id)
    })
  }
}

export const getters = {
  loggedProducts (state) {
    return state.products
  },
  product (state) {
    return state.product
  }
}
