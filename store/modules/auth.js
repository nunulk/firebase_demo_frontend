import api from '~/api/auth'
import firebaseApi from '~/api/firebase'

const parseJWToken = (token) => {
  if (!token) return {}
  let claim = token.split('.')[1]
  claim = claim.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(claim))
}

const storeTokens = (data) => {
  window.localStorage.setItem('appToken', data.appToken)
  window.localStorage.setItem('firebaseToken', data.firebaseToken)
}

const unstoreTokens = () => {
  window.localStorage.removeItem('appToken')
  window.localStorage.removeItem('firebaseToken')
}

const namespaced = true

const state = () => ({
  appToken: null,
  firebaseToken: null,
  appUser: null,
  firebaseUser: null,
})

const getters = {
  isTokenExpired: (state) => {
    const { exp } = parseJWToken(state.appToken)
    console.log('isTokenExpired', { exp, expired: exp <= Math.floor(Date.now() / 1000) })
    return exp <= Math.floor(Date.now() / 1000)
  },
  tokens: (state) => {
    return { appToken: state.appToken, firebaseToken: state.firebaseToken }
  },
}

const actions = {
  async login({ commit, getters }, form) {
    try {
      const res = await api.login(this, form)
      await firebaseApi.login(res.custom_token)
      commit('setTokens', res)
      storeTokens(getters.tokens)
    } catch (e) {
      throw e
    }
  },
  async refresh({ commit, getters }) {
    try {
      const data = await api.refresh(this)
      commit('setTokens', data)
      commit('setFirebaseToken', data.custom_token)
      storeTokens(getters.tokens)
    } catch (e) {
      unstoreTokens()
      throw e
    }
  },
  async me({ commit, state }) {
    const data = await api.me(this)
    console.log('auth.me', { user: data })
    commit('setAppUser', data)
    return state.appUser
  },
  async fetchFirebaseUser({ commit }) {
    const res = await firebaseApi.me(this)
    console.log('fetchFirebaseUser', { user: res })
    commit('setFirebaseUser', res)
    return res
  },
  async logout({ commit }) {
    commit('clearTokens')
    await firebaseApi.logout()
  },
}

const mutations = {
  setTokens(state, data) {
    state.appToken = data.access_token
    state.firebaseToken = data.custom_token
    console.log('setTokens', { appToken: state.appToken })
  },
  clearTokens(state) {
    state.appToken = null
    state.firebaseToken = null
    unstoreTokens()
  },
  setAppUser(state, user) {
    state.appUser = user
  },
  registerFirebaseCallback(state) {
    firebaseApi.registerCallback(state)
  },
  setFirebaseUser(state, user) {
    state.firebaseUser = user
  },
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
