import { authHeader } from '@/services/authHeader'

export default function ({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: authHeader()
  })

  api.onResponse((res) => {
    return res.data
  })

  // api.onError((error) => {
  //   if (error.response.status === 401) {
  //     redirect('/login')
  //   }
  // })

  // Set baseURL to something different
  api.setBaseURL('https://pedidoslosfrailes.com/api/')

  // Inject to context as $api
  inject('api', api)
}
