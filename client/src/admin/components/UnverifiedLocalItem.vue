<template>
  <div class="flex mt-2 lg:flex-row flex-col mb-4 items-center">
    <p class="w-full text-center font-bold">{{ local.title }}</p>
    <p class="w-full lg:mb-0 mb-2 text-center font-bold">{{ local.Account.email }}</p>
    <a target="_blank" :href="API_SEND_WHATSAPP_MESSAGE + local.phoneNumber"  class="flex-no-shrink block w-full p-2 ml-4 mr-2 border-2 rounded bg-green-500 hover:bg-green-600">
      <img class="m-auto" :src="whatsappIcon"/>
    </a>
    <a @click="phoneTrigger(local.phoneNumber)"  class="flex-no-shrink block w-full p-2 ml-4 mr-2 border-2 rounded bg-gray-500 cursor-pointer hover:bg-gray-600">
      <img class="m-auto" :src="phoneIcon"/>
    </a>
    <a @click="verifyLocalButton(local.accountId)" class="flex-no-shrink cursor-pointer block w-full p-2 ml-2 border-2 rounded bg-blue-700 hover:bg-blue-800">
      <img class="m-auto" :src="checkIcon"/>
    </a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import whatsapp from '@/_shared/assets/whatsapp.svg'
import check from '@/_shared/assets/check.svg'
import phone from '@/_shared/assets/phone.svg'
import { API_SEND_WHATSAPP_MESSAGE } from '@/_helpers'

export default {
  name: 'UnverifiedLocalItem',

  props: {
    local: { type: Object, required: true }
  },

  data () {
    return {
      whatsappIcon: whatsapp,
      checkIcon: check,
      phoneIcon: phone,
      API_SEND_WHATSAPP_MESSAGE: API_SEND_WHATSAPP_MESSAGE
    }
  },

  methods: {
    phoneTrigger (phoneNumber) {
      window.open(`tel:${phoneNumber}`)
    },
    verifyLocalButton (id) {
      this.$swal({
        title: '¿Estás seguro de verificar este local?',
        text: 'Su perfil y productos aparecerán públicamente',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true
      }).then((result) => {
        if (result.value) {
          this.$swal('Verificado', 'El local ha sido verificado con éxito', 'success')
          this.verifyLocal({ id, status: 'active' })
        }
      })
    },

    ...mapActions('local', ['verifyLocal'])
  }
}
</script>

<style>

</style>
