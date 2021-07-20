export const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/account/pages/Login'),
    meta: {
      title: 'Login'
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
