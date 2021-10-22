<template>
  <form ref="form" class="grid grid-cols-2 gap-2 bg-white rounded shadow-xl p-5" @submit.prevent="submitForm">
    <div class="col-span-2">
      <div class="text-2xl max-w-xl text-gray-600 leading-tight">
        Tu información <span class="text-red-400 text-sm">* requerido</span>
        <hr class="w-12 h-1 color-primary rounded-full mb-7 mt-1">
      </div>
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        v-model="orderInfo.name"
        required
        label="Nombre *"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        v-model="orderInfo.phoneNumber"
        v-mask="'+1 ###-###-####'"
        required
        type="tel"
        pattern="[+]{1}[0-9]{1} [0-9]{3}-[0-9]{3}-[0-9]{4}"
        label="Teléfono *"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        v-model="orderInfo.street"
        type="text"
        required
        label="Calle *"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        v-model="orderInfo.numberOfHouse"
        required
        label="Número de casa *"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        v-model="orderInfo.reference"
        required
        type="text"
        label="Referencia *"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        v-model="orderInfo.apartment"
        type="text"
        label="Edificio/Apto/Extensión"
      />
    </div>
    <div class="col-span-2 mt-2 pr-1">
      <material-input
        v-model="orderInfo.additionalNotes"
        type="text"
        label="Notas adicionales"
      />
    </div>
    <div class="col-span-2 flex flex-col flex-wrap">
      <p class="mt-4 text-gray-800 font-medium">
        Métodos de pago
      </p>
      <button
        class="flex items-center justify-between bg-white rounded-md border-2 border-blue-500 p-4 focus:outline-none"
      >
        <label class="flex items-center">
          <input
            type="radio"
            class="form-radio h-5 w-5 text-blue-600"
            checked
          ><span class="ml-2 text-sm text-gray-700">🛵 Pago en entrega</span>
        </label>
      </button>
    </div>
    <div class="mt-4 col-span-2 flex justify-center align-center">
      <button
        class="px-4 py-1 text-white font-bold color-primary custom-rounded hover:opacity-75"
        type="submit"
      >
        Enviar pedido
      </button>
    </div>
  </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'
import { currency } from '@/helpers'
import MaterialInput from '@/components/shared/MaterialInput'
export default {
  name: 'CheckoutForm',
  directives: { mask },
  components: { MaterialInput },
  data () {
    return {
      orderInfo: {
        name: '',
        phoneNumber: '',
        street: '',
        numberOfHouse: '',
        reference: '',
        apartment: '',
        additionalNotes: '',
        status: 'active',
        paymentMethod: 'Efectivo',
        LocalAccountId: Number(this.$route.params.id),
        DeliveryAccountId: 0,
        cartItems: []
      }
    }
  },
  computed: {
    ...mapGetters('delivery', ['activeDelivery']),
    deliverySelectedId () {
      return this.activeDelivery ? this.activeDelivery.accountId : 0
    },
    cartTotal () {
      return currency(this.$store.getters['cart/cartTotal'])
    },
    cartItems () {
      return this.$store.getters['cart/productsOnCart'].filter((item) => {
        const localId = Number(this.$route.params.id)
        return item.product.LocalAccountId === localId
      })
    }
  },
  created () {
    this.orderInfo.cartItems = this.cartItems
    this.getDeliveries()
  },
  methods: {
    ...mapActions('delivery', ['getDeliveries']),
    submitForm () {
      this.orderInfo.DeliveryAccountId = this.deliverySelectedId
      if (!this.deliverySelectedId) {
        this.$swal('No hay deliveries', 'No hay delivery activo para recoger tu orden. Inténtelo más tarde', 'warning')
        return
      }
      this.$swal({
        title: '¿Estás seguro de enviar el pedido?',
        text: 'No podrás revertir esta acción',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true
      }).then((result) => {
        if (result.value) {
          this.$swal('Enviado', 'El pedido se ha enviado con exito', 'success')
          this.addOrder(this.orderInfo)
          this.updateDeliveryStatus({ accountId: this.orderInfo.DeliveryAccountId, status: 'taken' })
          this.$refs.form.reset()
          // eslint-disable-next-line no-undef
          for (cartItem of this.cartItems) {
            // eslint-disable-next-line no-undef
            this.$store.dispatch('cart/removeProductFromCart', cartItem)
          }
          this.$router.push('/')
        }
      })
    },
    isEmpty (obj) {
      return !Object.values(obj).every(element => element !== '')
    },
    ...mapActions('order', ['addOrder']),
    ...mapActions('delivery', ['updateDeliveryStatus'])
  }
}
</script>
