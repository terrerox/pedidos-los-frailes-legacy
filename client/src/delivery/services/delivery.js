import { httpClient } from '@/_helpers'

const deliveryService = {}

deliveryService.create = (delivery) => {
  return httpClient.post('/deliveries/create', delivery)
}

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

deliveryService.getLogged = () => {
  return httpClient.get('/deliveries/logged')
    .then(res => res)
}

export default deliveryService
