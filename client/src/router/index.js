import { createWebHistory, createRouter } from 'vue-router'

import Products from '@/views/Products'
import Restaurants from '@/views/Restaurants'

const routes = [
  { path: '/', name: 'Restaurants', component: Restaurants },
  { path: '/:id', name: 'Products', component: Products }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
