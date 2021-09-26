<template>
  <form class="grid grid-cols-2 gap-2" @submit.prevent="handleSubmit">
    <div class="col-span-2">
      <material-input
        v-model="account.userName"
        required
        type="text"
        label="Usuario"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="account.password"
        required
        type="password"
        label="Contraseña"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="confirmPassword"
        required
        type="password"
        label="Confirmar contraseña"
      />
    </div>
    <div class="col-span-2">
      <Loader v-show="status.registering" />
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
import MaterialInput from '../shared/MaterialInput'
import Loader from '../shared/Loader'

export default {
  name: 'DeliveryRegisterForm',
  components: { MaterialInput, Loader },
  data () {
    return {
      account: {
        userName: '',
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
    this.logout()
  },
  methods: {
    ...mapActions('account', ['register', 'logout']),
    ...mapActions('alert', ['success', 'error']),
    handleSubmit () {
      const { userName, password } = this.account
      if (password !== this.confirmPassword) {
        return this.error('¡Las contraseñas no coinciden!')
      }
      this.submitted = true
      this.register({ userName, password, role: 'Delivery' })
    }
  }
}
</script>
