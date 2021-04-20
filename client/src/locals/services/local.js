import { httpClient } from '@/_helpers'

const localService = {}

localService.getAll = () => {
  return httpClient.get('/locals')
    .then(res => res)
}

localService.getById = (id) => {
  return httpClient.get(`/locals/${id}`)
    .then(res => res)
}

localService.getCurrent = () => {
  return httpClient.get('/locals/current')
    .then(res => res)
}

localService.update = (local) => {
  return httpClient.put('/locals/', local)
    .then(res => res)
}

export default localService
