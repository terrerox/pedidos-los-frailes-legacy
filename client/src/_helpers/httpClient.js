import axios from 'axios'
import store from '@/store'
import accountService from '@/account/services/account'
import router from '@/router'
import { authHeader } from '@/_helpers'

export const httpClient = axios.create({
  baseURL: 'http://localhost:4000/'
})

httpClient.interceptors.request.use((config) => {
  config.headers = authHeader()
  return config
})

httpClient.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response.status === 401) {
    // auto logout if 401 Unauthorized or 403 Forbidden response returned from aip
    store.dispatch('alert/error', 'La sección expiró, inicie nuevamente')
    accountService.logout()
    router.push('/login')
  }
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data.message)
  }
  return Promise.reject(error.message)
})
