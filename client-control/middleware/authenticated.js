export default function ({ store, redirect, $isServer }) {
  const { status, user } = store.state.account
  if (status.loggedIn) {
    const USER_ROLES = {
      Admin: () => redirect(`admin/${user.id}`),
      Local: () => redirect(`local/${user.id}/products`),
      Delivery: () => redirect(`delivery/${user.id}/orders`)
    }
    console.log(USER_ROLES[user.role]())
    console.log(status)
  }
  console.log(store.state)
}
