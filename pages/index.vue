<template>
  <div>
    <h3>User</h3>
    <div v-if="appUser">App User ID: {{ appUser.id }}</div>
    <div v-if="firebaseUser">Firebase User ID: {{ firebaseUser.uid }}</div>
    <nuxt-link to="/logout">Logout</nuxt-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: ['authenticated'],
  computed: {
    ...mapState('auth', ['appUser', 'firebaseUser']),
  },
}
</script>

<style scoped>
</style>

