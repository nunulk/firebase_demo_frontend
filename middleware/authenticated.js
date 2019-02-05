export default async ({ store, app, redirect }) => {
  const token = store.state.auth.appToken
  console.log('middware start', { store: store.state, appToken: token })
  if (!token) {
    return redirect('/login')
  }

  console.log('authenticated', { appToken: token })
  app.$axios.setToken(token, 'Bearer')

  const expired = store.getters['auth/isTokenExpired']
  if (expired) {
    console.log('expired?', { expired })
    try {
      await store.dispatch('auth/refresh')
    } catch {
      return redirect('/login')
    }
    app.$axios.setToken(token, 'Bearer')
  }

  if (!store.state.auth.appUser) {
    await store.dispatch('auth/me')
  }

  store.commit('auth/registerFirebaseCallback')
  
  console.log('middleware passed');
}
