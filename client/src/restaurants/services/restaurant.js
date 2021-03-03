import { httpClient } from '@/_helpers'

const restaurantService = {}

restaurantService.getAll = () => {
  return httpClient.get('/restaurants')
    .then(res => res)
}

restaurantService.getById = (id) => {
  return httpClient.get(`/restaurants/${id}`)
    .then(res => res)
}

restaurantService.getCurrent = () => {
  return httpClient.get('/restaurants/current')
    .then(res => res)
}

export default restaurantService
