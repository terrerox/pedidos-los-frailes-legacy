import { createWebHistory, createRouter } from 'vue-router'

import Menu from '@/components/Menu'
import Locals from '@/views/Locals'

const routes = [
  { path: '/', name: 'Locals', component: Locals },
  { path: '/:test', name: 'Menu', component: Menu }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
