// eslint-disable-next-line require-await
export default async function ({ $auth, store, redirect }) {
  const isLogged = $auth.loggedIn
  if (!isLogged) {
    store.dispatch('alert/error', 'La sesión expiró, inicie sesión nuevamente')
    return redirect('/')
  }
}
