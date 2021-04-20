import { createWebHistory, createRouter } from 'vue-router'

import Login from '@/account/pages/Login'
import Register from '@/account/pages/Register'
import Shop from '@/shop/pages/Shop'
import Home from '@/home/pages/Home'
import Checkout from '@/orders/pages/Checkout'
import Local from '@/locals/pages/Local'
import Order from '@/locals/pages/Order'
import Delivery from '@/delivery/pages/Delivery'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/shop/:id/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/local/:id',
    name: 'Local',
    component: Local
  },
  {
    path: '/local/:id/order/:orderId',
    name: 'Order',
    component: Order
  },
  {
    path: '/delivery/:id',
    name: 'Delivery',
    component: Delivery
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = [
    'Login',
    'Register',
    'Delivery',
    'Home',
    'Shop',
    'Checkout'
  ]
  const authRequired = !publicPages.includes(to.name)
  const loggedIn = localStorage.getItem('local')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
