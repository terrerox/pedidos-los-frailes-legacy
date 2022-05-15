export default function ({ $axios, store, $config: { baseURL } }, inject) {
  const api = $axios.create()

  api.onResponse((res) => {
    return res.data
  })

  api.onRequest((config) => {
    if (config.url === '/subscriptions/key') {
      config.responseType = 'arraybuffer'
    }
    return config
  })

  api.setBaseURL(baseURL)

  inject('api', api)
}
