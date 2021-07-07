<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <material-input
        required
        type="text"
        label="Usuario"
        v-model="userName"
      />
    </div>
    <div class="mt-5">
      <div class="flex justify-between items-center">
        <div class="text-sm font-bold text-gray-700 tracking-wide">
        </div>
        <div>
          <a
            class="text-xs font-display font-semibold text-color-primary cursor-pointer"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
      <material-input
        required
        type="password"
        v-model="password"
        label="Contraseña"
      />
    </div>
    <div class="mt-10">
      <Loader v-show="status.loggingIn"/>
      <button
        class="color-primary text-gray-100 p-4 w-full rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
      >
        Inicia sesión
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'
import Loader from '@/_shared/Loader'

export default {
  name: 'LoginForm',

  components: { MaterialInput, Loader },

  data () {
    return {
      userName: '',
      password: '',
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
    ...mapActions('account', ['login', 'logout']),
    ...mapActions('alert', ['success', 'error']),

    handleSubmit (e) {
      this.submitted = true
      const { userName, password } = this
      if (userName && password) {
        this.login({ userName, password })
      }
    }
  }
}
</script>

<style></style>
