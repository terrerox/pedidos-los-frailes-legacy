export default function ({ store, redirect }) {
  if (process.browser) {
    const { status } = store.state.account
    if (!status.loggedIn) {
      return redirect('/')
    }
  }
}
