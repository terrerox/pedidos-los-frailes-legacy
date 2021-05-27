import { httpClient } from '@/_helpers'

const orderService = {}

orderService.loggedOrders = () => {
  return httpClient.get('/orders')
    .then(res => res)
}

orderService.deliveryOrders = () => {
  return httpClient.get('/orders/delivery')
    .then(res => res)
}

orderService.getAll = () => {
  return httpClient.get('/orders/all')
    .then(res => res)
}

orderService.getById = (id) => {
  return httpClient.get(`/orders/${id}`)
    .then(res => res)
}

orderService.update = (order) => {
  return httpClient.put(`/orders/${order.id}`, order)
    .then(res => res)
}

orderService.deleteOrder = id => {
  return httpClient.delete(`/orders/${id}`)
}

orderService.addOrder = order => {
  return httpClient.post('/orders/create', order)
}

export default orderService
