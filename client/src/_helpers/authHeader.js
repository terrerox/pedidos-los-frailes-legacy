export function authHeader () {
  // return authorization header with jwt token
  const restaurant = JSON.parse(localStorage.getItem('restaurant'))
  if (restaurant) {
    return { Authorization: 'Bearer ' + restaurant }
  } else {
    return {}
  }
}
