const orderService = {}

orderService.update = (order, api) => {
  return api.put(`/orders/${order.id}`, order)
    .then(res => res.data)
}

orderService.deleteOrder = (id, api) => {
  return api.delete(`/orders/${id}`)
}

orderService.addOrder = (order, api) => {
  return api.post('/orders/create', order)
}

export default orderService
