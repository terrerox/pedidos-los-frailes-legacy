const localService = {}

localService.getAll = (api) => {
  return api.get('/locals')
    .then(res => res.data)
}

localService.getById = (id, api) => {
  return api.get(`/locals/${id}`)
    .then(res => res.data)
}

export default localService
