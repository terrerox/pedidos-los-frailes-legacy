export function authHeader () {
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
