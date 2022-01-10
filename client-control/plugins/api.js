export default function ({ $axios, $auth, $config: { baseUrl } }, inject) {
  const api = $axios.create()

  api.onResponse((res) => {
    return res.data
  })
  api.onRequest((config) => {
    if (config.url === '/subscriptions/key') {
      config.responseType = 'arraybuffer'
    }
    config.headers.Authorization = $auth.strategies.local.token.get()
    return config
  })

  api.setBaseURL(baseUrl)

  inject('api', api)
}
