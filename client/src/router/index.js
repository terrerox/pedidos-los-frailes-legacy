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
import Admin from '@/admin/pages/Admin'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/delivery-register',
    name: 'DeliveryRegister',
    component: DeliveryRegister,
    meta: {
      title: 'Registrar delivery'
    }
  },
  {
    path: '/local-register',
    name: 'LocalRegister',
    component: LocalRegister,
    meta: {
      title: 'Registrar local'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Pedidos Los Frailes'
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: Shop,
    meta: {
      title: 'Tienda'
    }
  },
  {
    path: '/shop/:id/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      title: 'Checkout'
    }
  },
  {
    path: '/local/:id',
    name: 'Local',
    component: Local,
    meta: {
      title: 'Local Dashboard'
    }
  },
  {
    path: '/local-info',
    name: 'LocalInfo',
    component: LocalInfo,
    meta: {
      title: 'Información del local'
    }
  },
  {
    path: '/local/:id/order/:orderId',
    name: 'Order',
    component: Order,
    meta: {
      title: 'Información de orden'
    }
  },
  {
    path: '/delivery/:id',
    name: 'Delivery',
    component: Delivery,
    meta: {
      title: 'Delivery Dashboard'
    }
  },
  {
    path: '/delivery-info',
    name: 'DeliveryInfo',
    component: DeliveryInfo,
    meta: {
      title: 'Información del delivery'
    }
  },
  {
    path: '/admin/:id',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Admin Dashboard'
    }
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
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
  // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
