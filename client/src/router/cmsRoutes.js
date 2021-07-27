export const cmsRoutes = [
  {
    path: '/local/:id',
    name: 'Local',
    component: () => import('@/locals/pages/Local'),
    meta: {
      title: 'Local Dashboard'
    },
    children: [
      {
        path: 'products',
        name: 'LocalProduct',
        component: () => import('@/locals/components/LocalProduct'),
        meta: {
          title: 'Productos'
        }
      },
      {
        path: 'orders',
        name: 'LocalOrder',
        component: () => import('@/locals/components/LocalOrder'),
        meta: {
          title: 'Ordenes'
        }
      },
      {
        path: 'profile',
        name: 'LocalProfile',
        component: () => import('@/locals/components/LocalEditProfile'),
        meta: {
          title: 'Editar Perfil'
        }
      }
    ]
  },
  {
    path: '/delivery/:id',
    name: 'Delivery',
    component: () => import('@/delivery/pages/Delivery'),
    meta: {
      title: 'Delivery Dashboard'
    },
    children: [
      {
        path: 'profile',
        name: 'DeliveryProfile',
        component: () => import('@/delivery/components/DeliveryEditProfile'),
        meta: {
          title: 'Editar Perfil'
        }
      },
      {
        path: 'orders',
        name: 'DeliveryOrder',
        component: () => import('@/delivery/components/DeliveryOrder'),
        meta: {
          title: 'Ordenes'
        }
      }
    ]
  },
  {
    path: '/admin/:id',
    name: 'Admin',
    component: () => import('@/admin/pages/Admin'),
    meta: {
      title: 'Admin Dashboard'
    }
  }
]
