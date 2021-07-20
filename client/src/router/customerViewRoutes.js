export const customerViewRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/home/pages/Home'),
    meta: {
      title: 'Pedidos Los Frailes'
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('@/shop/pages/Shop'),
    meta: {
      title: 'Tienda'
    }
  },
  {
    path: '/shop/:id/checkout',
    name: 'Checkout',
    component: () => import('@/orders/pages/Checkout'),
    meta: {
      title: 'Checkout'
    }
  }
]
