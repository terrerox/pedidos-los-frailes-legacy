export function authHeader () {
  // return authorization header with jwt token
  const local = JSON.parse(localStorage.getItem('local'))
  if (local) {
    return { Authorization: 'Bearer ' + local }
  } else {
    return {}
  }
}
