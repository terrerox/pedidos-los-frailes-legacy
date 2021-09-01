export function authHeader () {
  // return authorization header with jwt token
  let account

  if (process.browser) {
    account = JSON.parse(localStorage.getItem('account'))
  }

  if (account) {
    return { Authorization: 'Bearer ' + account.token }
  } else {
    return {}
  }
}
