const deliveryService = {}

deliveryService.create = (delivery, api) => {
  return api.post('/deliveries/create', delivery)
}

deliveryService.getAll = (api) => {
  return api.get('/deliveries/all')
    .then(res => res)
}

deliveryService.getById = (id, api) => {
  return api.get(`/deliveries/${id}`)
    .then(res => res)
}

deliveryService.update = (delivery, api) => {
  return api.put('/deliveries', delivery)
    .then(res => res)
}

deliveryService.deleteDelivery = (id, api) => {
  return api.delete(`/deliveries/${id}`)
}

deliveryService.getLogged = (api) => {
  return api.get('/deliveries/logged')
    .then(res => res)
}

export default deliveryService
