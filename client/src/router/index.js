import { createWebHistory, createRouter } from 'vue-router'

import Products from '@/components/Products'
import Locals from '@/views/Locals'

const routes = [
  { path: '/', name: 'Locals', component: Locals },
  { path: '/:id', name: 'Products', component: Products }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
