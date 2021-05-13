<template>
    <form class="grid grid-cols-2 gap-2" ref="accountForm">
        <div class="col-span-2">
          <material-input type="text" label="Email" v-model="account.email" />
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
import { mapActions, mapState } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'

export default {
  name: 'UpdateAccountForm',

  components: { MaterialInput },

  data () {
    return {
      account: {
        email: '',
        password: ''
      },
      confirmPassword: ''
    }
  },

  computed: {
    ...mapState('local', ['loggedLocal'])
  },

  created () {
    this.setAccountInfo()
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
    },

    setAccountInfo () {
      const { account, loggedLocal } = this
      account.email = loggedLocal.email
    }
  }
}
</script>

<style>

</style>
