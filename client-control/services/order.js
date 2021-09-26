const orderService = {}

orderService.loggedOrders = (api) => {
  return api.get('/orders')
    .then(res => res)
}

orderService.deliveryOrders = (api) => {
  return api.get('/orders/delivery')
    .then(res => res)
}

orderService.getAll = (api) => {
  return api.get('/orders/all')
    .then(res => res)
}

orderService.getById = (id, api) => {
  return api.get(`/orders/${id}`)
    .then(res => res)
}

orderService.update = (order, api) => {
  return api.put(`/orders/${order.id}`, order)
    .then(res => res)
}

orderService.deleteOrder = (id, api) => {
  return api.delete(`/orders/${id}`)
}

orderService.addOrder = (order, api) => {
  return api.post('/orders/create', order)
}

export default orderService
