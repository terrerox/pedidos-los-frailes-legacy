import axios from 'axios'
import { authHeader } from './authHeader'

export const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://pedidoslosfrailes.com/api/'
})

httpClient.interceptors.request.use((config) => {
  config.headers = authHeader()
  return config
})
