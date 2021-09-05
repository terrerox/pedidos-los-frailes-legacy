<template>
  <div class="container">
    <div v-if="deliveryOrders.length" class="notes">
      <div
        v-for="order in deliveryOrders"
        :key="order"
        class="note cursor-pointer"
        :class="'transform ' + rotate()"
        :style="'margin:'+margin()+ '; background:'+color()+''"
      >
        <div class="details">
          <div class="title text-lg">
            Orden de {{ order.Local.title }}
          </div>
          <div class="title text-lg">
            {{ order.name }}
          </div>
          <div class="title text-lg">
            {{ order.street }}
          </div>
          <div class="title text-lg">
            Casa #{{ order.numberOfHouse }}
          </div>
          <div class="title text-lg">
            {{ order.reference }}
          </div>
          <div v-if="order.apartment" class="title text-lg">
            {{ order.apartment }}
          </div>
          <div class="title text-lg">
            {{ order.phoneNumber }}
          </div>
          <div class="title text-lg">
            {{ order.paymentMethod }}
          </div>
          <div v-if="order.additionalNotes" class="title text-lg">
            {{ order.additionalNotes }}
          </div>
          <div class="title text-lg">
            <OrderCartItem
              v-for="cartItem in order.cartItems"
              :key="cartItem.product.id"
              :cart-item="cartItem"
            />
          </div>
          <div class="float-right text-base">
            <strong>{{ cartTotal(order) }}</strong>
          </div>
          <div class="my-10 float-right">
            <button
              class="absolute bottom-0 text-sm lined thin"
              @click="submitOrder(order.id)"
            >
              {{ buttonTitle }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-center text-2xl text-gray-600 leading-tight">
        No hay ordenes
      </div>
      <img
        class="w-full lg:w-1/2 m-auto mt-5 lg:mt-12"
        src="../../assets/img/empty.svg"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrderCartItem from '../local/OrderCartItem'

import { currency } from '../../helpers'

let i = 0
export default {
  name: 'DeliveryOrder',

  components: { OrderCartItem },

  data () {
    return {
      isConfirmed: false
    }
  },

  computed: {
    ...mapGetters('order', ['deliveryOrders']),

    buttonTitle () {
      return !this.isConfirmed ? 'Confirmar orden' : 'Orden entregada'
    }
  },

  created () {
    this.getDeliveryOrders()
  },

  methods: {
    ...mapActions('order', ['getDeliveryOrders']),

    submitOrder (id) {
      if (!this.isConfirmed) {
        this.$swal({
          title: '¿Estás seguro de confirmar esta orden?',
          text: 'No podrás revertir esta acción',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          showCloseButton: true,
          icon: 'warning'
        }).then((result) => {
          if (result.value) {
            this.$swal('Confirmada', 'Orden confirmada con éxito', 'success')
            this.$store.dispatch('order/updateOrder', {
              id,
              status: 'confirmed'
            })
            this.isConfirmed = true
          }
        })
      } else {
        this.$swal({
          title: '¿Has entregado la orden?',
          text: 'No podrás revertir esta acción',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          showCloseButton: true,
          icon: 'warning'
        }).then((result) => {
          if (result.value) {
            this.$swal('Entregada', 'Orden entragada con éxito', 'success')
            this.$store.dispatch('order/deleteDeliveryOrder', { id })
            const deliveryId = Number(this.$route.params.id)
            this.$store.dispatch('delivery/updateDelivery', {
              accountId: deliveryId,
              status: 'active'
            })
          }
        })
      }
    },

    cartTotal (order) {
      return currency(
        order.cartItems.reduce(
          (total, current) => total + current.product.price * current.quantity,
          0
        )
      )
    },

    margin () {
      const randomMargin = ['-5px', '1px', '5px', '10px', '15px', '20px']
      return randomMargin[Math.floor(Math.random() * randomMargin.length)]
    },

    rotate () {
      const randomDegree = ['rotate-3', 'rotate-1', '-rotate-1', '-rotate-3', '-rotate-6', '-rotate-12']
      return randomDegree[Math.floor(Math.random() * randomDegree.length)]
    },

    color () {
      const randomColors = ['#c2ff3d', '#3dc2ff', '#04e022', '#bc83e6', '#ebb328']
      if (i > randomColors.length - 1) {
        i = 0
      }
      return randomColors[i++]
    }
  }
}
</script>

<style scoped>

.notes{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

.note{
  transition: all .2s ease-in-out;
  box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.507);
}

.note h1{
  font-size: 1.5rem;
}

.note:hover {
  transform: scale(1);
}

.details {
  margin-top: 25px;
  padding: 0 15px;
  font-size: 1.5rem;
}

/* Circle */

button {
      background:transparent;
      font-size:1rem;

      border-top-left-radius: 255px 15px;
      border-top-right-radius: 15px 225px;
      border-bottom-right-radius: 225px 15px;
      border-bottom-left-radius:15px 255px;
}

button:hover{
   box-shadow:2px 8px 4px -6px hsla(0,0%,0%,.3);
}

button.lined.thin{
   border:solid 2px #41403E;
}

</style>
