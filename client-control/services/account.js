import { httpClient } from './httpClient'

const accountService = {}

accountService.login = (userName, password) => {
  return httpClient.post('/accounts/authenticate', { userName, password })
    .then((account) => {
      const { token, role, id } = account

      if (token) {
        process.browser && localStorage.setItem('account', JSON.stringify({ id, token, role }))
      }
      return account
    })
}

accountService.register = ({ userName, password, role }) => {
  return httpClient.post('/accounts/register', { userName, password, role })
    .then(account => account)
}

accountService.getLogged = () => {
  return httpClient.get('/accounts/logged')
    .then(account => account)
}

accountService.logout = () => {
  process.browser && localStorage.removeItem('account')
}

accountService.update = (account) => {
  return httpClient.put('/accounts/', account)
    .then(res => res)
}

export default accountService
