import localService from '@/locals/services/local'
import deliveryService from '@/delivery/services/delivery'
import router from '@/router'

export const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/account/pages/Login'),
    meta: {
      title: 'Login'
    },
    beforeEnter: (to, from, next) => {
      const account = JSON.parse(localStorage.getItem('account'))

      if (!account) return next()

      if (account.role === 'Local') {
        localService.getLogged().then(res => {
          res.notFound
            ? router.push('/local-info')
            : router.push(`/local/${account.id}/products`)
        })
      } else if (account.role === 'Delivery') {
        deliveryService.getLogged().then(res => {
          res.notFound
            ? router.push('/delivery-info')
            : router.push(`/delivery/${account.id}/orders`)
        })
      } else {
        router.push(`/admin/${account.id}`)
      }
    }
  },
  {
    path: '/delivery-register',
    name: 'DeliveryRegister',
    component: () => import('@/account/pages/DeliveryRegister'),
    meta: {
      title: 'Registrar delivery'
    }
  },
  {
    path: '/local-register',
    name: 'LocalRegister',
    component: () => import('@/account/pages/LocalRegister'),
    meta: {
      title: 'Registrar local'
    }
  },
  {
    path: '/local-info',
    name: 'LocalInfo',
    component: () => import('@/locals/pages/LocalInfo'),
    meta: {
      title: 'Información del local'
    }
  },
  {
    path: '/delivery-info',
    name: 'DeliveryInfo',
    component: () => import('@/delivery/pages/DeliveryInfo'),
    meta: {
      title: 'Información del delivery'
    }
  }
]
