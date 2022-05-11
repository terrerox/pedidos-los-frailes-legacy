const accountService = {}

accountService.join = (api, ...rest) => {
  const [email, role] = rest
  return api.post('/accounts/join', { email, role })
    .then((res) => {
      console.log(res)
      return res
    })
}

accountService.getLogged = (api) => {
  return api.get('/accounts/logged')
    .then(account => account)
}

export default accountService
