export default function ({ $axios, store, $config: { baseUrl } }, inject) {
  const api = $axios.create()
  const { token } = store.state.authentication

  api.onResponse((res) => {
    console.log(res)
    return res.data
  })
  api.onRequest((re) => {
    console.log(re)
    return re
  })

  api.setToken(token, 'Bearer', ['post', 'delete'])
  console.log(token)
  api.setBaseURL(process.env.BASE_URL)

  inject('api', api)
}
