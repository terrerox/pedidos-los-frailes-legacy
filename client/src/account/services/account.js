import { httpClient } from '@/_helpers'
const accountService = {}

accountService.login = (email, password) => {
  return httpClient.post('/accounts/authenticate', { email, password })
    .then(account => {
      const { token } = account

      if (token) {
        localStorage.setItem('account', JSON.stringify(token))
      }
      return account
    })
}

accountService.register = ({ email, password, role }) => {
  return httpClient.post('/accounts/register', { email, password, role })
    .then(account => account)
}

accountService.getLogged = () => {
  return httpClient.get('/accounts/logged')
    .then(account => account)
}

accountService.logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('account')
}

accountService.update = (account) => {
  return httpClient.put('/accounts/', account)
    .then(res => res)
}

export default accountService
