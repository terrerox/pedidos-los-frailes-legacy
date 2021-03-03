import { httpClient } from '@/_helpers'
const accountService = {}

accountService.login = (email, password) => {
  return httpClient.post('/restaurants/authenticate', { email, password })
    .then(restaurant => {
      const { token } = restaurant

      if (token) {
        // store restaurant details and jwt token in local storage to keep restaurant logged in between page refreshes
        localStorage.setItem('restaurant', JSON.stringify(token))
      }

      return restaurant
    })
}
accountService.logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('restaurant')
}

export default accountService
