export default ({ store, redirect }) => {
  if (store.state.auth.appToken) {
    return redirect('/')
  }
}
