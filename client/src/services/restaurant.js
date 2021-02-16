import { httpClient } from './httpClient'

const restaurantService = {}

restaurantService.login = (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }
  return httpClient.get('/authenticate', requestOptions)
    .then(handleResponse)
    .then(restaurant => {
      // login successful if there's a jwt token in the response
      if (restaurant.token) {
        // store restaurant details and jwt token in local storage to keep restaurant logged in between page refreshes
        localStorage.setItem('restaurant', JSON.stringify(restaurant))
      }

      return restaurant
    })
}

restaurantService.register = (user) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  return httpClient.get('/restaurants/register', requestOptions)
    .then(handleResponse)
}

restaurantService.getAll = () => {
  return httpClient.get('/restaurants')
    .then(res => res.data)
}

restaurantService.getById = (id) => {
  return httpClient.get(`/restaurants/${id}`)
    .then(res => res.data)
}

// HELPERS

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

function logout () {
  localStorage.removeItem('restaurant')
}

export default restaurantService
