// eslint-disable-next-line require-await
export default async function ({ store, redirect }) {
  const isAuthenticated = store.state.authentication.authenticated
  if (!isAuthenticated) {
    store.dispatch('alert/error', 'La sesión expiró, inicie sesión nuevamente')
    return redirect('/')
  }
}
