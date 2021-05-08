<template>
  <form class="grid grid-cols-2 gap-2" ref="form">
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Cédula"
        v-model="delivery.nationalId"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Nombre"
        v-model="delivery.name"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        type="text"
        required
        label="Apellido"
        v-model="delivery.lastName"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1 combo">
      <img class="w-20 trigger object-cover object-center" :src="delivery.image" alt="delivery image" />
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
        v-model="delivery.email"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        label="Contraseña"
        v-model="delivery.password"
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
        label="Número de teléfono"
        v-model="delivery.phoneNumber"
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
      delivery: {
        accountId: 0,
        nationalId: '',
        name: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        image: ''
      },
      confirmPass: ''
    }
  },
  created () {
    this.getLoggedDelivery()
    setTimeout(() => {
      this.setDelivery(this.loggedDelivery)
    }, 2000)
  },
  computed: {
    ...mapState('delivery', ['loggedDelivery'])
  },

  methods: {
    ...mapActions('delivery', ['getLoggedDelivery']),
    ...mapActions('delivery', ['updateDelivery']),
    ...mapActions('account', ['updateAccount']),

    submitForm () {
      const { email, password, ...deliveryWithoutEmailAndPass } = this.delivery
      if (this.confirmPass !== password) {
        this.$swal('Advertencia', 'Las contraseñas no coinciden', 'warning')
        return
      }
      this.updateDelivery(deliveryWithoutEmailAndPass)
      this.updateAccount({ id: this.loggedDelivery.id, email, password })
      this.$swal('Actualizado', 'Delivery actualizado con éxito', 'success')
      this.$emit('close')
    },

    setDelivery (loggedDelivery) {
      const { nationalId, lastName, phoneNumber, image, name } = loggedDelivery.Delivery
      this.delivery.accountId = loggedDelivery.id
      this.delivery.nationalId = nationalId
      this.delivery.name = name
      this.delivery.lastName = lastName
      this.delivery.phoneNumber = phoneNumber
      this.delivery.email = loggedDelivery.email
      this.delivery.image = image
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

<style scoped>
.combo { position: relative; }
.combo .trigger { position: absolute; right: 0%; top: 1px }
</style>
