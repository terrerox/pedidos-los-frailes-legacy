<template>
    <form class="grid grid-cols-2 gap-2" @submit.prevent="handleSubmit" ref="accountForm">
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
    ...mapState('delivery', ['loggedDelivery'])
  },

  created () {
    this.setAccountInfo()
  },

  methods: {
    ...mapActions('account', ['updateAccount']),
    ...mapActions('alert', ['error']),

    handleSubmit () {
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
      const { account, loggedDelivery } = this
      account.email = loggedDelivery.email
    }
  }
}
</script>

<style>

</style>
