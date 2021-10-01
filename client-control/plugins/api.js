export default function ({ $axios, store }, inject) {
  const api = $axios.create()

  api.onResponse((res) => {
    return res.data
  })

  api.onRequest((config) => {
    if (store.state.account.user) {
      config.headers.Authorization = 'Bearer ' + store.state.account.user.token
    }

    return config
  })

  api.setBaseURL('https://api.pedidoslosfrailes.com/api/')

  inject('api', api)
}
