import api from '@/api/db.js'

import { createStore } from 'vuex'
import cart from './modules/cart'

export default createStore({
  modules: {
    cart
  },
  state: {
    restaurants: [],
    products: []
  },
  mutations: {
    setRestaurants (state, restaurants) {
      state.restaurants = restaurants
    },
    setProducts (state, products) {
      state.products = products
    }
  },
  actions: {
    getRestaurants ({ commit }) {
      commit('setRestaurants', api)
    },
    getProducts (context, payload) {
      const result = api.find(restaurant => restaurant.id === payload.id)
      context.commit('setProducts', result.products)
    }
  },
  getters: {}
})
