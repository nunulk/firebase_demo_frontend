export default function({ store }) {
  console.log('token-loader middleware starting')
  const appToken = window.localStorage.getItem('appToken')
  const firebaseToken = window.localStorage.getItem('firebaseToken')
  if (appToken) {
    console.log('token-loader', { appToken, firebaseToken, store })
    store.commit('auth/setTokens', {
      access_token: appToken,
      custom_token: firebaseToken
    })
  }
}
