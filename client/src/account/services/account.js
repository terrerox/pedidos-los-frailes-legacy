import { httpClient } from '@/_helpers'
const accountService = {}

accountService.login = (email, password) => {
  return httpClient.post('/accounts/authenticate', { email, password })
    .then(local => {
      const { token } = local

      if (token) {
        // store local details and jwt token in local storage to keep local logged in between page refreshes
        localStorage.setItem('local', JSON.stringify(token))
      }

      return local
    })
}
accountService.logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('local')
}

export default accountService
