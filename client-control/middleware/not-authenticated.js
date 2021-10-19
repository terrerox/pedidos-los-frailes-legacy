export default function ({ store, redirect }) {
  const { status } = store.state.account
  if (!status.loggedIn) {
    return redirect('/')
  }
}
