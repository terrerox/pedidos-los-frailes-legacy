export default function ({ $axios, store }, inject) {
  const api = $axios.create()

  api.onResponse((res) => {
    return res.data
  })
  api.onRequest((config) => {
    if (config.url === '/subscriptions/key') {
      config.responseType = 'arraybuffer'
    }
    console.log(config)
    return config
  })

  api.setBaseURL(process.env.BASE_URL)

  inject('api', api)
}
