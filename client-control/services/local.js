const localService = {}

localService.create = (local, api) => {
  return api.post('/locals/create', local)
    .then(res => res)
}

localService.getAll = (api) => {
  return api.get('/locals')
    .then(res => res)
}

localService.getById = (id, api) => {
  return api.get(`/locals/${id}`)
    .then(res => res)
}

localService.getLogged = (api) => {
  return api.get('/locals/logged')
    .then(res => res)
}

localService.update = (local, api) => {
  return api.put('/locals/', local)
    .then(res => res)
}

export default localService
