export default function ({ $axios, store }, inject) {
  const api = $axios.create()
  const { token } = store.state.authentication

  api.onResponse((res) => {
    return res.data
  })

  api.onRequest((config) => {
    if (config.url === '/subscriptions/key') {
      config.responseType = 'arraybuffer'
    }
  })

  api.setToken(token, 'Bearer')
  api.setBaseURL(process.env.BASE_URL)

  inject('api', api)
}
