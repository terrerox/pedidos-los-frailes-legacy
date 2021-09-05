<template>
  <form ref="deliveryForm" class="grid grid-cols-2 gap-2" @submit.prevent="submit">
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="delivery.nationalId"
        v-mask="'###-#######-#'"
        type="text"
        label="Cédula"
        pattern="[0-9]{3}-[0-9]{7}-[0-9]{1}"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="delivery.name"
        type="text"
        label="Nombre"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="delivery.lastName"
        type="text"
        label="Apellido"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="delivery.phoneNumber"
        v-mask="'+1 ###-###-####'"
        type="tel"
        pattern="[+]{1}[0-9]{1} [0-9]{3}-[0-9]{3}-[0-9]{4}"
        label="Teléfono"
      />
    </div>
    <div class="col-span-2">
      <label>Imagen</label>
      <input
        type="file"
        accept="image/*"
        class="mb-10"
        @change="handleImage"
      >
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { mask } from 'vue-the-mask'
import MaterialInput from '../shared/MaterialInput'

export default {
  name: 'UpdateDeliveryForm',

  directives: { mask },

  components: { MaterialInput },

  emits: ['close'],

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
