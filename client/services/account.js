const accountService = {}

accountService.join = (api, ...rest) => {
  const [email, role] = rest
  return api.post('/accounts/join', { email, role })
    .then(res => res)
}

export default accountService
