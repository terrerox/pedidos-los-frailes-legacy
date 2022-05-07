const pushService = {}

pushService.getKey = (api) => {
  return api.get('/subscriptions/key')
    .then(key => new Uint8Array(key))
}

pushService.subscribe = (subscription, api) => {
  return api.post('/subscriptions/subscribe', subscription)
    .then(subscription => subscription)
}

export default pushService
