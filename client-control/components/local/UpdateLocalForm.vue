<template>
  <form ref="localForm" class="grid grid-cols-2 gap-2">
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="local.title"
        type="text"
        label="Nombre del local"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-select
        v-model="local.category"
        label="Categoria"
        :content="categoryItems"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <label>Imagen</label>
      <input
        type="file"
        accept="image/*"
        class="mb-10"
        @change="handleImage"
      >
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="local.description"
        type="text"
        label="Descripción"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="local.address"
        type="text"
        label="Dirección"
      />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input
        v-model="local.phoneNumber"
        v-mask="'+1 ###-###-####'"
        type="tel"
        pattern="[+]{1}[0-9]{1} [0-9]{3}-[0-9]{3}-[0-9]{4}"
        label="Teléfono"
      />
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { mask } from 'vue-the-mask'
import MaterialInput from '../shared/MaterialInput'
import MaterialSelect from '../shared/MaterialSelect'

export default {
  name: 'UpdateLocalForm',

  directives: { mask },

  components: { MaterialInput, MaterialSelect },

  emits: ['close'],

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
      categoryItems: ['Farmacia', 'Comida rápida', 'Bebidas']
    }
  },

  computed: {
    ...mapState('local', ['loggedLocal'])
  },

  created () {
    setTimeout(() => {
      this.setLocalInfo()
    }, 100)
  },

  methods: {
    ...mapActions('local', ['updateLocal']),
    ...mapActions('alert', ['error']),

    submit () {
      const { local } = this
      if (this.isEmpty(local)) {
        this.error('Debe de llenar todos los campos')
        return
      }
      this.updateLocal(local)
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
    },

    setLocalInfo () {
      const { description, title, phoneNumber, address, category, image } = this.loggedLocal.Local
      this.local.description = description
      this.local.title = title
      this.local.phoneNumber = phoneNumber
      this.local.address = address
      this.local.category = category
      this.local.image = image
    }
  }
}
</script>

<style>

</style>
