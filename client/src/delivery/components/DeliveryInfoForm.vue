<template>
 <form class="grid grid-cols-2 gap-2 bg-white rounded shadow-xl p-5 m-8" @submit.prevent="handleSubmit">
    <Alert />
   <p class="col-span-2 text-gray-800 font-bold m-2 mb-4">¡Completa tu registro!</p>
   <div class="col-span-2 lg:col-span-1">
      <material-input
        required
        type="text"
        label="Ingresa su cédula"
        v-model="delivery.nationalId"
        pattern="[0-9]{3}-[0-9]{7}-[0-9]{1}"
        v-mask="'###-#######-#'"
       />
   </div>
   <div class="col-span-2 lg:col-span-1">
      <material-input
        required
        type="text"
        label="Nombre"
        v-model="delivery.name"
      />
   </div>
   <div class="col-span-2 lg:col-span-1">
      <material-input
        required
        type="text"
        label="Apellido"
        v-model="delivery.lastName"
      />
   </div>
   <div class="col-span-2 lg:col-span-1">
      <material-input
        requiredd
        type="tel"
        pattern="[+]{1}[0-9]{1} [0-9]{3}-[0-9]{3}-[0-9]{4}"
        label="Teléfono"
        v-model="delivery.phoneNumber"
        v-mask="'+1 ###-###-####'"
      />
   </div>
   <div class="col-span-2 lg:col-span-1">
      <label>Foto de perfil</label>
      <input
        required
        type="file"
        accept="image/*"
        class="mb-10"
        @change="handleImage"
      />
   </div>
   <div class="col-span-2">
      <button
        class="color-primary text-gray-100 p-4 w-full rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
        type="submit"
      >
        Siguiente
      </button>
   </div>
 </form>
</template>

<script>
import { mapActions } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'
import Alert from '@/_shared/Alert'
import { mask } from 'vue-the-mask'

export default {
  name: 'DeliveryInfoForm',

  directives: { mask },

  components: { MaterialInput, Alert },

  data () {
    return {
      delivery: {
        nationalId: '',
        name: '',
        lastName: '',
        status: 'active',
        phoneNumber: '',
        image: ''
      }
    }
  },

  methods: {
    ...mapActions('delivery', ['createDelivery']),
    ...mapActions('alert', ['error']),

    handleSubmit () {
      this.createDelivery(this.delivery)
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
    }
  }

}
</script>

<style>

</style>
