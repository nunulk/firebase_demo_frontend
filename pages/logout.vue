<template>
  <div/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('auth', ['logout']),
  },
  async created() {
    await this.logout()
    this.$router.push('/login')
  },
}
</script>
