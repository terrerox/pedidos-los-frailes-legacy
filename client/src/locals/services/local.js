import { httpClient } from '@/_helpers'
import clodinary from '@/_helpers/cloudinaryConfig'

const localService = {}

localService.create = (local) => {
  return httpClient.post('/locals/create', local)
    .then(res => res)
}

localService.getAll = () => {
  console.log(clodinary)
  return httpClient.get('/locals')
    .then(res => res)
}

localService.getById = (id) => {
  return httpClient.get(`/locals/${id}`)
    .then(res => res)
}

localService.getLogged = () => {
  return httpClient.get('/locals/logged')
    .then(res => res)
}

localService.update = (local) => {
  return httpClient.put('/locals/', local)
    .then(res => res)
}

export default localService
