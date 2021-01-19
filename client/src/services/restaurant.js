import { httpClient } from './httpClient'

const restaurantService = {}

restaurantService.getAll = () => {
  return httpClient.get('/restaurants')
    .then(res => res.data)
}

restaurantService.getById = (id) => {
  return httpClient.get(`/restaurants/${id}`)
    .then(res => res.data)
}

export default restaurantService
