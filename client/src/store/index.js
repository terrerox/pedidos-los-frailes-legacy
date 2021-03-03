import { createStore } from 'vuex'
import { cart } from './modules/cart'
import { order } from './modules/order'
import { restaurant } from './modules/restaurant'
import { product } from './modules/product'
import { account } from './modules/account'
import { alert } from './modules/alert'

const store = createStore({
  modules: {
    cart,
    order,
    restaurant,
    product,
    account,
    alert
  }
})

export default store
