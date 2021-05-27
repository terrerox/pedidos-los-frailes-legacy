<template>
 <form class="grid grid-cols-2 gap-2" @submit.prevent="handleSubmit">
    <div class="col-span-2">
      <material-input
        required
        type="email"
        label="Email"
        v-model="account.email"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        required
        type="password"
        label="Contraseña"
        v-model="account.password"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        required
        type="password"
        label="Confirmar contraseña"
        v-model="confirmPassword"
      />
    </div>
    <div class="col-span-2">
      <button
        class="color-primary text-gray-100 p-4 w-full rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
        type="submit"
      >
        ¡Enviar!
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'

export default {
  name: 'App',

  components: { MaterialInput },

  data () {
    return {
      account: {
        email: '',
        password: ''
      },
      confirmPassword: '',
      submitted: false
    }
  },

  computed: {
    ...mapState('account', ['status'])
  },

  created () {
    // reset login status
    this.logout()
  },

  methods: {
    ...mapActions('account', ['register', 'logout']),
    ...mapActions('alert', ['success', 'error']),

    handleSubmit () {
      const { email, password } = this.account
      if (password !== this.confirmPassword) {
        return this.error('¡Las contraseñas no coinciden!')
      }
      this.submitted = true
      this.register({ email, password, role: 'Local' })
    }
  }
}
</script>

<style scoped>
</style>
