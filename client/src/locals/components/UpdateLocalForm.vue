<template>
    <form class="grid grid-cols-2 gap-2" ref="localForm">
        <div class="col-span-2 lg:col-span-1">
          <material-input type="text" label="Nombre del local" v-model="local.title" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <material-select
            label="Categoria"
            :content="categoryItems"
            v-model="local.category"
          />
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
          <material-input type="text" label="Teléfono" v-model="local.phoneNumber" />
        </div>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'
import MaterialSelect from '@/_shared/MaterialSelect'

export default {
  name: 'UpdateLocalForm',

  emits: ['close'],

  components: { MaterialInput, MaterialSelect },

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
