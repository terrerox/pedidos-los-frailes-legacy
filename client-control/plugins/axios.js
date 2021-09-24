export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    console.log(error)
    if (error.response.status === 401) {
      redirect('/login')
    }
  })
}
