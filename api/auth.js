export default {
  login(app, data) {
    return app.$axios.$post('/api/auth/login', data)
  },
  refresh(app) {
    return app.$axios.$post('/api/auth/refresh')
  },
  me(app) {
    return app.$axios.$get('/api/auth/me')
  },
}
