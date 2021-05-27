import { createWebHistory, createRouter } from 'vue-router'

import Login from '@/account/pages/Login'
import DeliveryRegister from '@/account/pages/DeliveryRegister'
import LocalRegister from '@/account/pages/LocalRegister'
import Shop from '@/shop/pages/Shop'
import Home from '@/home/pages/Home'
import Checkout from '@/orders/pages/Checkout'
import Local from '@/locals/pages/Local'
import LocalInfo from '@/locals/pages/LocalInfo'
import Order from '@/locals/pages/Order'
import Delivery from '@/delivery/pages/Delivery'
import DeliveryInfo from '@/delivery/pages/DeliveryInfo'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/delivery-register',
    name: 'DeliveryRegister',
    component: DeliveryRegister
  },
  {
    path: '/local-register',
    name: 'LocalRegister',
    component: LocalRegister
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
    path: '/local-info',
    name: 'LocalInfo',
    component: LocalInfo
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
    path: '/delivery-info',
    name: 'DeliveryInfo',
    component: DeliveryInfo
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
    'Delivery',
    'DeliveryRegister',
    'LocalRegister',
    'Home',
    'Shop',
    'Checkout'
  ]
  const authRequired = !publicPages.includes(to.name)
  const loggedIn = localStorage.getItem('account')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
