import { httpClient } from '@/_helpers/httpClient'

const orderService = {}

orderService.getAll = () => {
  return httpClient.get('/orders')
    .then(res => res.data)
}

orderService.getById = (id) => {
  return httpClient.get(`/orders/${id}`)
    .then(res => res.data)
}

orderService.deleteOrder = id => {
  return httpClient.delete(`/orders/${id}`)
}

orderService.addOrder = order => {
  return httpClient.post('/orders/create', order)
}

export default orderService
