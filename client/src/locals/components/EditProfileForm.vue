<template>
  <form class="grid grid-cols-2 gap-2" ref="form">
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Nombre"
        v-model="local.title"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Telefono"
        v-model="local.telephone"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        type="text"
        required
        label="Dirección"
        v-model="local.address"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1 combo">
      <img class="w-20 trigger object-cover object-center" :src="local.image" alt="local image" />
      <input
        type="file"
        accept="image/*"
        class="mb-10"
        @change="handleImage"
      />
    </div>
    <div class="col-span-2 mt-2">
      <material-input
        required
        type="text"
        label="Email"
        v-model="local.email"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        label="Contraseña"
        v-model="local.password"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        label="Confirmar contraseña"
        v-model="confirmPass"
      />
    </div>
    <div class="col-span-2 mt-2">
      <material-input
        label="Editar descripción"
        v-model="local.description"
      />
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MaterialInput from '@/_shared/inputs/MaterialInput'
export default {
  name: 'OwnerProfileForm',

  components: { MaterialInput },

  data () {
    return {
      local: {
        id: 0,
        title: '',
        description: '',
        telephone: '',
        category: '',
        email: '',
        password: '',
        image: ''
      },
      confirmPass: ''
    }
  },
  created () {
    this.getLoggedLocal()
    setTimeout(() => {
      this.setLocalForEdit(this.loggedLocal)
    }, 2000)
  },
  computed: {
    ...mapState('local', ['loggedLocal'])
  },

  methods: {
    ...mapActions('local', ['updateLocal']),
    ...mapActions('local', ['getLoggedLocal']),

    submitForm () {
      if (this.confirmPass !== this.local.password) {
        this.$swal('Advertencia', 'Las contraseñas no coinciden', 'warning')
        return
      }
      this.updateLocal(this.local)
      this.$swal('Actualizado', 'Local actualizado con éxito', 'success')
      this.$emit('close')
    },

    setLocalForEdit (loggedLocal) {
      const { description, title, telephone, address, category, image } = loggedLocal.Local
      this.local.id = loggedLocal.id
      this.local.description = description
      this.local.title = title
      this.local.telephone = telephone
      this.local.address = address
      this.local.category = category
      this.local.email = loggedLocal.email
      this.local.password = loggedLocal.password
      this.local.image = image
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
.combo { position: relative; }
.combo .trigger { position: absolute; right: 0%; top: 1px }
</style>
