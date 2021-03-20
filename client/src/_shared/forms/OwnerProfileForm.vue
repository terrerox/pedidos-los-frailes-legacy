<template>
  <form class="grid grid-cols-2 gap-2" ref="form">
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Nombre"
        v-model="restaurant.title"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Telefono"
        v-model="restaurant.telephone"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        type="text"
        required
        label="Dirección"
        v-model="restaurant.address"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1 combo">
      <img class="w-20 trigger object-cover object-center" :src="restaurant.image" alt="restaurant image" />
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
        v-model="restaurant.email"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        label="Contraseña"
        v-model="restaurant.password"
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
        v-model="restaurant.description"
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
      restaurant: {
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
    this.setRestaurantForEdit()
  },
  computed: {
    ...mapState('restaurant', ['loggedRestaurant'])
  },

  methods: {
    ...mapActions('restaurant', ['updateRestaurant']),

    submitForm () {
      if (this.restaurant.password.length < 6) {
        this.$swal('Advertencia', 'La contraseña debe de tener + 5 caracteres', 'warning')
        return
      }
      if (this.confirmPass !== this.restaurant.password) {
        this.$swal('Advertencia', 'Las contraseñas no coinciden', 'warning')
        return
      }
      this.updateRestaurant(this.restaurant)
      this.$swal('Actualizado', 'Local actualizado con éxito', 'success')
      this.$emit('close')
    },

    setRestaurantForEdit () {
      this.restaurant.id = this.loggedRestaurant.id
      this.restaurant.description = this.loggedRestaurant.description
      this.restaurant.telephone = this.loggedRestaurant.telephone
      this.restaurant.address = this.loggedRestaurant.address
      this.restaurant.category = this.loggedRestaurant.category
      this.restaurant.email = this.loggedRestaurant.email
      this.restaurant.password = this.loggedRestaurant.password
      this.restaurant.image = this.loggedRestaurant.image
    },
    handleImage (e) {
      const selectedImage = e.target.files[0] // get first file
      this.createBase64Image(selectedImage)
    },
    createBase64Image (fileObject) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.restaurant.image = e.target.result
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
