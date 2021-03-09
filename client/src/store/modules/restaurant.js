import restaurantService from '@/restaurants/services/restaurant'

const state = {
  restaurants: [],
  currentRestaurant: {},
  loggedRestaurant: {}
}

const mutations = {
  setRestaurants (state, restaurants) {
    state.restaurants = restaurants
  },
  setCurrentRestaurant (state, restaurant) {
    state.currentRestaurant = restaurant
  },
  setLoggedRestaurant (state, restaurant) {
    state.loggedRestaurant = restaurant
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
  },
  getLoggedRestaurant (context, id) {
    return restaurantService.getCurrent()
      .then(res => {
        context.commit('setLoggedRestaurant', res)
      })
  },
  updateRestaurant (context, restaurant) {
    return restaurantService.update(restaurant)
      .then(res => {
        context.commit('setLoggedRestaurant', res)
      })
  }
}

const getters = {
  restaurants (state) {
    return state.restaurants
  },
  currentRestaurant (state) {
    return state.currentRestaurant
  },
  loggedRestaurant (state, getters, rootState) {
    return state.loggedRestaurant
  }
}

export const restaurant = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
