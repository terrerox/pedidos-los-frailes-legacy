import { createWebHistory, createRouter } from 'vue-router'

import Products from '@/views/Products'
import Restaurants from '@/views/Restaurants'
import Checkout from '@/views/Checkout'

const routes = [
  { path: '/', name: 'Restaurants', component: Restaurants },
  { path: '/:id', name: 'Products', component: Products },
  { path: '/:id/checkout', name: 'Checkout', component: Checkout }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
