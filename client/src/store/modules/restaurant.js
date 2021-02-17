import restaurantService from '@/restaurants/services/restaurant'

const state = {
  restaurants: [],
  currentRestaurant: {}
}

const mutations = {
  setRestaurants (state, restaurants) {
    state.restaurants = restaurants
  },
  setCurrentRestaurant (state, restaurant) {
    state.currentRestaurant = restaurant
  }
}

const actions = {
  getRestaurants ({ commit }) {
    return restaurantService.getAll()
      .then(res => {
        commit('setRestaurants', res)
      })
  },
  getRestaurant (context, id) {
    return restaurantService.getById(id)
      .then(res => {
        context.commit('setCurrentRestaurant', res)
      })
  }
}

const getters = {
  restaurants (state) {
    return state.restaurants
  },
  currentRestaurant (state) {
    return state.currentRestaurant
  }
}

export const restaurant = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
