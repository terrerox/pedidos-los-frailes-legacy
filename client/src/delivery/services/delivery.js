import { httpClient } from '@/_helpers'

const deliveryService = {}

deliveryService.getAll = () => {
  return httpClient.get('/deliveries/all')
    .then(res => res)
}

deliveryService.getById = (id) => {
  return httpClient.get(`/deliveries/${id}`)
    .then(res => res)
}

deliveryService.update = (delivery) => {
  return httpClient.put(`/deliveries/${delivery.accountId}`, delivery)
    .then(res => res)
}

deliveryService.deleteDelivery = id => {
  return httpClient.delete(`/deliveries/${id}`)
}

export default deliveryService
