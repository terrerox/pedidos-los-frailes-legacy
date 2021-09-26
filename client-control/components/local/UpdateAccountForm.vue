<template>
  <form ref="accountForm" class="grid grid-cols-2 gap-2">
    <div class="col-span-2">
      <material-input v-model="userName" type="text" label="Usuario" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input v-model="account.password" type="password" label="Contraseña" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input v-model="confirmPassword" type="password" label="Confirmar Contraseña" />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

import MaterialInput from '../shared/MaterialInput'

export default {
  name: 'UpdateAccountForm',

  components: { MaterialInput },

  props: {
    loggedLocal: { type: Object, required: true }
  },

  data () {
    return {
      account: {
        userName: '',
        password: ''
      },
      confirmPassword: ''
    }
  },

  computed: {
    userName: {
      get () {
        return this.loggedLocal.userName
      },
      set (value) {
        this.account.userName = value
      }
    }
  },

  methods: {
    ...mapActions('account', ['updateAccount']),
    ...mapActions('alert', ['error']),

    submit () {
      const { account } = this
      if (this.isEmpty(account)) {
        this.error('Debe de llenar todos los campos')
        return
      }
      if (this.confirmPassword !== account.password) {
        this.error('Las contraseñas no coinciden')
        return
      }
      this.updateAccount(account)
    },

    isEmpty (obj) {
      return !Object.values(obj).every(element => element !== '')
    }
  }
}
</script>

<style>

</style>
