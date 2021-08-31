export function authHeader () {
  // return authorization header with jwt token
  const account = JSON.parse(localStorage.getItem('account'))
  if (account) {
    return { Authorization: 'Bearer ' + account.token }
  } else {
    return {}
  }
}
