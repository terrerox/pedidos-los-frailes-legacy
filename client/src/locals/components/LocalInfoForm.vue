<template>
 <form class="grid grid-cols-2 gap-2 bg-white rounded shadow-xl p-5 m-8" @submit.prevent="handleSubmit">
   <Alert />
   <p class="col-span-2 text-gray-800 font-bold m-2 mb-4">¡Completa tu registro!</p>
   <div class="col-span-2 lg:col-span-1">
      <material-input
        type="text"
        label="Nombre del local"
        v-model="local.title"
      />
   </div>
   <div class="col-span-2 lg:col-span-1">
      <material-select
        :content="selectItems"
        label="Categoria"
        v-model="local.category"
      />
   </div>
   <div class="col-span-2 lg:col-span-1">
      <label>Imagen de presentación</label>
      <input
        type="file"
        accept="image/*"
        class="mb-10"
        @change="handleImage"
      />
   </div>
   <div class="col-span-2 lg:col-span-1">
      <material-input
        type="text"
        label="Descripción"
        v-model="local.description"
      />
   </div>
   <div class="col-span-2 lg:col-span-1">
      <material-input
        type="text"
        label="Dirección"
        v-model="local.address"
      />
   </div>
   <div class="col-span-2 lg:col-span-1">
      <material-input
        type="text"
        label="Teléfono"
        v-model="local.phoneNumber"
        v-mask="'+1 ###-###-####'"
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

import { mask } from 'vue-the-mask'
import MaterialInput from '@/_shared/inputs/MaterialInput'
import MaterialSelect from '@/_shared/MaterialSelect'
import Alert from '@/_shared/Alert'

export default {
  name: 'LocalInfoForm',

  directives: { mask },

  components: { MaterialInput, MaterialSelect, Alert },

  data () {
    return {
      local: {
        title: '',
        category: '',
        image: '',
        description: '',
        address: '',
        phoneNumber: ''
      },
      selectItems: ['Fármacos', 'Comida', 'Bebidas']
    }
  },

  methods: {
    ...mapActions('local', ['createLocal']),
    ...mapActions('alert', ['error']),

    handleSubmit () {
      if (this.isEmpty(this.local)) {
        return this.error('¡Llene todos los campos!')
      }
      this.createLocal(this.local)
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
        this.local.image = e.target.result
      }
      reader.readAsDataURL(fileObject)
    }
  }

}
</script>

<style>

</style>
