<template>
 <form class="grid grid-cols-2 gap-2" @submit.prevent="handleSubmit">
    <template v-if="currentStep === 0">
      <div class="col-span-2">
        <material-input type="text" label="Email" v-model="account.email" />
      </div>
      <div class="col-span-2 lg:col-span-1">
        <material-input type="text" label="Contraseña" v-model="account.password" />
      </div>
      <div class="col-span-2 lg:col-span-1">
        <material-input type="text" label="Confirmar Contraseña" v-model="confirmPass" />
      </div>
    </template>

    <template v-if="currentStep === 1">
      <div class="col-span-2 lg:col-span-1">
        <material-input type="text" label="Nombre del local" v-model="local.name" />
      </div>
      <div class="col-span-2 lg:col-span-1">
        <material-input type="text" label="Categoria" v-model="local.category" />
      </div>
      <div class="col-span-2 lg:col-span-1">
        <label>Imagen</label>
        <input
          type="file"
          accept="image/*"
          class="mb-10"
          @change="handleImage"
        />
      </div>
      <div class="col-span-2 lg:col-span-1">
        <material-input type="text" label="Descripción" v-model="local.description" />
      </div>
      <div class="col-span-2 lg:col-span-1">
        <material-input type="text" label="Dirección" v-model="local.address" />
      </div>
      <div class="col-span-2 lg:col-span-1">
        <material-input type="text" label="Teléfono" v-model="local.telNumber" />
      </div>
    </template>

    <button
      class="color-primary text-gray-100 p-4 w-full rounded-full tracking-wide
      font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
      v-if="currentStep !== 0"
      type="button"
      @click="prevStep"
    >
      Previo
    </button>
    <button
      class="color-primary text-gray-100 p-4 w-full rounded-full tracking-wide
      font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
      v-if="currentStep === 1"
      type="submit"
    >
      ¡Continuar!
    </button>
    <div class="col-span-2">
      <button
        class="color-primary text-gray-100 p-4 w-full rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
        v-if="currentStep !== 1"
        type="button"
        @click="nextStep"
      >
        Siguiente
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'

export default {
  name: 'App',

  components: { MaterialInput },

  data () {
    return {
      currentStep: 0,
      account: {
        email: '',
        password: ''
      },
      local: {
        name: '',
        category: '',
        image: '',
        description: '',
        address: '',
        telNumber: ''
      },
      confirmPass: '',
      submitted: false
    }
  },

  computed: {
    ...mapState('account', ['status'])
  },

  created () {
    // reset login status
    this.logout()
  },

  methods: {
    ...mapActions('account', ['register', 'logout']),
    ...mapActions('local', ['createLocal']),

    handleSubmit () {
      if (this.isEmpty(this.local)) {
        return alert('mamañemazo')
      }
      this.submitted = true
      const { email, password } = this.account
      this.register({ email, password, role: 'Local' })
      setTimeout(() => {
        this.createLocal(this.local)
      }, 2000)
    },

    nextStep () {
      if (this.isEmpty(this.account)) {
        return alert('asshole complete the field')
      }
      if (this.account.password !== this.confirmPass) {
        return alert('asshole passwords dont match')
      }
      this.currentStep++
    },

    prevStep () {
      if (this.currentStep <= 0) {
        return
      }
      this.currentStep--
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

<style scoped>
</style>
