import restaurantService from '@/services/restaurant'
export default {
  state: {
    restaurants: [],
    currentRestaurant: {}
  },
  mutations: {
    setRestaurants (state, restaurants) {
      state.restaurants = restaurants
    },
    setCurrentRestaurant (state, restaurant) {
      state.currentRestaurant = restaurant
    }
  },
  actions: {
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
  },
  getters: {
    restaurants (state) {
      return state.restaurants
    },
    currentRestaurant (state) {
      return state.currentRestaurant
    }
  }
}
