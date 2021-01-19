import { httpClient } from './httpClient'

const orderService = {}

orderService.getAll = () => {
  return httpClient.get('/orders')
    .then(res => res.data)
}

orderService.getById = (id) => {
  return httpClient.get(`/orders/${id}`)
    .then(res => res.data)
}

orderService.addOrder = order => {
  return httpClient.post('/orders', order)
}

export default orderService