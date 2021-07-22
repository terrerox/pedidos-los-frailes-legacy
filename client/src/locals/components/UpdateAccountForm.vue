<template>
    <form class="grid grid-cols-2 gap-2" ref="accountForm">
        <div class="col-span-2">
          <material-input type="text" label="Usuario" v-model="userName" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <material-input type="password" label="Contraseña" v-model="account.password" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <material-input type="password" label="Confirmar Contraseña" v-model="confirmPassword" />
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'

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
