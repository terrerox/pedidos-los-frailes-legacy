<template>
  <div class="flex mt-2 lg:flex-row flex-col mb-4 items-center">
    <p class="w-full text-center font-bold">
      {{ delivery.name }} {{ delivery.lastName }}
    </p>
    <p class="w-full lg:mb-0 mb-2 text-center font-bold">
      {{ delivery.Account.userName }}
    </p>
    <a v-tooltip="'Escribir por Whatsapp'" target="_blank" :href="API_SEND_WHATSAPP_MESSAGE + delivery.phoneNumber" class="flex-no-shrink block w-full p-2 ml-4 mr-2 border-2 rounded bg-green-500 hover:bg-green-600">
      <img class="m-auto" :src="whatsappIcon">
    </a>
    <a v-tooltip="'Llamar por teléfono'" class="flex-no-shrink block w-full p-2 ml-4 mr-2 border-2 rounded bg-gray-500 cursor-pointer hover:bg-gray-600" @click="phoneTrigger(delivery.phoneNumber)">
      <img class="m-auto" :src="phoneIcon">
    </a>
    <a v-tooltip="'Verificar'" class="flex-no-shrink block cursor-pointer w-full p-2 ml-2 border-2 rounded bg-blue-700 hover:bg-blue-800" @click="verifyDeliveryButton(delivery.accountId)">
      <img class="m-auto" :src="checkIcon">
    </a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import whatsapp from '../../assets/img/whatsapp.svg'
import check from '../../assets/img/check.svg'
import phone from '../../assets/img/phone.svg'
import { API_SEND_WHATSAPP_MESSAGE } from '../../helpers'

export default {
  name: 'UnverifiedDeliveryItem',

  props: {
    delivery: { type: Object, required: true }
  },

  data () {
    return {
      whatsappIcon: whatsapp,
      checkIcon: check,
      phoneIcon: phone,
      API_SEND_WHATSAPP_MESSAGE
    }
  },

  methods: {
    phoneTrigger (phoneNumber) {
      window.open(`tel:${phoneNumber}`)
    },
    verifyDeliveryButton (id) {
      this.$swal({
        title: '¿Estás seguro de verificar este delivery?',
        text: 'Su perfil aparecerá públicamente',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true
      }).then((result) => {
        if (result.value) {
          this.$swal('Verificado', 'El delivery ha sido verificado con éxito', 'success')
          this.updateDeliveryStatus({ accountId: id, status: 'active' })
        }
      })
    },

    ...mapActions('delivery', ['updateDeliveryStatus'])
  }
}
</script>

<style>

</style>
