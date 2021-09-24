import { authHeader } from '@/services/authHeader'

export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: authHeader()
  })

  // Set baseURL to something different
  api.setBaseURL('https://pedidoslosfrailes.com/api/')

  // Inject to context as $api
  inject('api', api)
}
