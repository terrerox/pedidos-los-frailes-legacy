import { createStore } from 'vuex'
import cart from './modules/cart'
import order from './modules/order'
import restaurant from './modules/restaurant'
import product from './modules/product'

const store = createStore({
  modules: {
    cart,
    order,
    restaurant,
    product
  }
})

export default store

store.dispatch('getRestaurants')
