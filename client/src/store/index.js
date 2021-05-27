import { createStore } from 'vuex'
import { cart } from './modules/cart'
import { order } from './modules/order'
import { local } from './modules/local'
import { product } from './modules/product'
import { account } from './modules/account'
import { delivery } from './modules/delivery'
import { alert } from './modules/alert'

const store = createStore({
  modules: {
    cart,
    order,
    local,
    product,
    account,
    delivery,
    alert
  }
})

export default store
