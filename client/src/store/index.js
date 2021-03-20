import { createStore } from 'vuex'
import { cart } from './modules/cart'
import { order } from './modules/order'
import { restaurant } from './modules/restaurant'
import { product } from './modules/product'
import { account } from './modules/account'
import { delivery } from './modules/delivery'
import { alert } from './modules/alert'

const store = createStore({
  modules: {
    cart,
    order,
    restaurant,
    product,
    account,
    delivery,
    alert
  }
})

export default store
