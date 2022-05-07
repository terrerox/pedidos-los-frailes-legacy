const localService = {}

localService.getAll = (api) => {
  return api.get('/locals')
    .then(res => res)
}

localService.getById = (id, api) => {
  return api.get(`/locals/${id}`)
    .then(res => res)
}

export default localService
