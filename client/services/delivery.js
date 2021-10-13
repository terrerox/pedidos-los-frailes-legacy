const deliveryService = {}

deliveryService.getAll = (api) => {
  return api.get('/deliveries/all')
    .then(res => res.data)
}

deliveryService.update = (delivery, api) => {
  return api.put(`/deliveries/${delivery.accountId}`, delivery)
    .then(res => res.data)
}

export default deliveryService
