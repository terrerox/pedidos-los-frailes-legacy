import axios from 'axios'
import { authHeader } from '@/_helpers'

export const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://pedidoslosfrailes.com/api/'
})

httpClient.interceptors.request.use((config) => {
  config.headers = authHeader()
  return config
})

httpClient.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data.message)
  }
  return Promise.reject(error.message)
})
