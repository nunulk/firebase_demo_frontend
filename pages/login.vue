<template>
  <div>
    <h2>Sign in</h2>
    <b-row>
      <b-col :cols="6" :offset="3">
        <b-card>
          <b-form-group>
            <b-form-input v-model="form.email" autocomplete="on"/>
          </b-form-group>
          <b-form-group>
            <b-form-input type="password" v-model="form.password"/>
          </b-form-group>
          <b-form-group>
            <b-button variant="primary" @click="signIn">SignIn</b-button>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: ['anonymous'],
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      uid: null,
      me: {
        id: null,
      },
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async signIn() {
      await this.login(this.form)
      console.log('redirect to home')
      this.$router.push('/')
    }
  }
}
</script>
