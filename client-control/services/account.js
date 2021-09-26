const accountService = {}

accountService.login = (userName, password, api) => {
  return api.post('/accounts/authenticate', { userName, password })
    .then((account) => {
      const { token, role, id } = account

      if (token) {
        process.browser && localStorage.setItem('account', JSON.stringify({ id, token, role }))
      }
      return account
    })
}

accountService.register = ({ userName, password, role }, api) => {
  return api.post('/accounts/register', { userName, password, role })
    .then(account => account)
}

accountService.getLogged = (api) => {
  return api.get('/accounts/logged')
    .then(account => account)
}

accountService.logout = () => {
  process.browser && localStorage.removeItem('account')
}

accountService.update = (account, api) => {
  return api.put('/accounts/', account)
    .then(res => res)
}

export default accountService
