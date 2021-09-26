<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <material-input
        v-model="userName"
        required
        type="text"
        label="Usuario"
      />
    </div>
    <div class="mt-2">
      <div class="flex justify-between items-center">
        <div class="text-sm font-bold text-gray-700 tracking-wide" />
        <div>
          <a
            class="text-xs font-display font-semibold text-color-primary cursor-pointer"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
      <material-input
        v-model="password"
        required
        type="password"
        label="Contraseña"
      />
    </div>
    <div class="mt-10">
      <Loader v-show="status.loggingIn" />
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
import MaterialInput from '../shared/MaterialInput'
import Loader from '../shared/Loader'

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
  methods: {
    ...mapActions({
      login: 'account/login'
    }),
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
