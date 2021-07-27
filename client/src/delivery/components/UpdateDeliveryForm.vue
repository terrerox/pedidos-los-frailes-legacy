<template>
    <form class="grid grid-cols-2 gap-2" @submit.prevent="submit" ref="deliveryForm">
        <div class="col-span-2 lg:col-span-1">
          <material-input
            type="text"
            label="Cédula"
            v-model="delivery.nationalId"
            pattern="[0-9]{3}-[0-9]{7}-[0-9]{1}"
            v-mask="'###-#######-#'"
          />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <material-input
            type="text"
            label="Nombre"
            v-model="delivery.name"
          />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <material-input
            type="text"
            label="Apellido"
            v-model="delivery.lastName"
          />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <material-input
            type="tel"
            pattern="[+]{1}[0-9]{1} [0-9]{3}-[0-9]{3}-[0-9]{4}"
            label="Teléfono"
            v-mask="'+1 ###-###-####'"
            v-model="delivery.phoneNumber" />
        </div>
        <div class="col-span-2">
          <label>Imagen</label>
          <input
            type="file"
            accept="image/*"
            class="mb-10"
            @change="handleImage"
          />
        </div>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'
import { mask } from 'vue-the-mask'

export default {
  name: 'UpdateDeliveryForm',

  directives: { mask },

  emits: ['close'],

  components: { MaterialInput },

  data () {
    return {
      delivery: {
        accountId: 0,
        nationalId: '',
        name: '',
        lastName: '',
        phoneNumber: '',
        image: ''
      }
    }
  },

  computed: {
    ...mapState('delivery', ['loggedDelivery'])
  },

  created () {
    setTimeout(() => {
      this.setDeliveryInfo()
    }, 100)
  },

  methods: {
    ...mapActions('delivery', ['updateDelivery']),
    ...mapActions('alert', ['error']),

    submit () {
      const { delivery } = this
      if (this.isEmpty(delivery)) {
        this.error('Debe de llenar todos los campos')
        return
      }
      this.updateDelivery(delivery)
    },

    isEmpty (obj) {
      return !Object.values(obj).every(element => element !== '')
    },

    handleImage (e) {
      const selectedImage = e.target.files[0] // get first file
      this.createBase64Image(selectedImage)
    },

    createBase64Image (fileObject) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.delivery.image = e.target.result
      }
      reader.readAsDataURL(fileObject)
    },

    setDeliveryInfo () {
      const { accountId, nationalId, name, lastName, phoneNumber, image } = this.loggedDelivery.Delivery
      this.delivery.accountId = accountId
      this.delivery.nationalId = nationalId
      this.delivery.name = name
      this.delivery.lastName = lastName
      this.delivery.phoneNumber = phoneNumber
      this.delivery.image = image
    }
  }
}
</script>

<style>

</style>
