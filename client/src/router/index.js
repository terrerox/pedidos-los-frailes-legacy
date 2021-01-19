import { createWebHistory, createRouter } from 'vue-router'

import Shop from '@/views/Shop'
import Home from '@/views/Home'
import Checkout from '@/views/Checkout'
import RestaurantOwner from '@/views/RestaurantOwner'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/:id/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/resowner/:id',
    name: 'RestaurantOwner',
    component: RestaurantOwner
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
