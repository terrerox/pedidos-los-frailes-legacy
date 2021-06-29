import axios from 'axios'
import store from '@/store'
import accountService from '@/account/services/account'
import router from '@/router'
import { authHeader } from '@/_helpers'

export const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:4000/api/'
})

httpClient.interceptors.request.use((config) => {
  config.headers = authHeader()
  return config
})

httpClient.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response.status === 401) {
    store.dispatch('alert/error', 'La sección expiró, inicie nuevamente')
    accountService.logout()
    router.push('/login')
  }
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data.message)
  }
  return Promise.reject(error.message)
})
