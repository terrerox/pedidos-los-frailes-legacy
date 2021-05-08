<template>
 <form class="grid grid-cols-2 gap-2" @submit.prevent="handleSubmit">
    <div class="col-span-2">
      <material-input type="email" label="Email" v-model="account.email" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input type="text" label="Contraseña" v-model="account.password" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input type="text" label="Confirmar Contraseña" v-model="confirmPass" />
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
      confirmPass: '',
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
    ...mapActions('alert', ['success']),

    handleSubmit () {
      if (this.isEmpty(this.account)) {
        return alert('llena todo')
      }
      this.submitted = true
      const { email, password } = this.account
      this.register({ email, password, role: 'Local' })
    },

    isEmpty (obj) {
      return !Object.values(obj).every(element => element !== '')
    }
  }
}
</script>

<style scoped>
</style>
