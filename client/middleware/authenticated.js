export default function ({ store, redirect }) {
  const isAuthenticated = store.state.authentication.authenticated
  if (!isAuthenticated) {
    return redirect('/login')
  }
}
