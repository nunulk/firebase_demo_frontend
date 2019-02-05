import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
  login(token) {
    return firebase.auth().signInWithCustomToken(token)
  },
  registerCallback(state) {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged', { user, state });
      state.firebaseUser = user
    })
  },
  async me(app) {
    const user = firebase.auth().currentUser
    console.log('firebase.me', { firebaseToken: app.getters['auth/tokens']['firebaseToken'] })
    if (!user && app.getters['auth/tokens']['firebaseToken']) {
      await this.login(app.getters['auth/tokens']['firebaseToken'])
      return firebase.auth().currentUser
    }
    return user
  },
  logout() {
    firebase.auth().signOut()
  },
}
