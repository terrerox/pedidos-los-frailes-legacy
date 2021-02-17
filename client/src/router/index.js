import { createWebHistory, createRouter } from 'vue-router'

import Shop from '@/shop/pages/Shop'
import Home from '@/home/pages/Home'
import Checkout from '@/orders/pages/Checkout'
import Restaurant from '@/restaurants/pages/Restaurant'

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
    path: '/restaurant/:id',
    name: 'Restaurant',
    component: Restaurant
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
