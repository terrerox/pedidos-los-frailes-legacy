import axios from 'axios'
import accountService from '@/account/services/account'
import { authHeader } from '@/_helpers'

export const httpClient = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: authHeader()
})

httpClient.interceptors.response.use((response) => {
  if (response.status !== 200) {
    if ([401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      accountService.logout()
      location.reload()
    }
  }
  return response.data
}, (error) => {
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data.message)
  }
  return Promise.reject(error.message)
})
