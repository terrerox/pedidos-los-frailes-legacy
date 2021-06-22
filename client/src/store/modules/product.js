import productService from '@/shop/services/product'

const state = {
  products: [],
  product: {},
  status: { isLoading: false }
}

const mutations = {
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

const actions = {
  getLoggedProducts (context, id) {
    return productService.getLoggedProducts()
      .then(products => {
        context.commit('setProducts', products)
      })
  },
  addProduct ({ commit, dispatch }, product) {
    commit('productRequest')
    return productService.addProduct(product).then(res => {
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
    return productService.updateProduct(product).then(res => {
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
