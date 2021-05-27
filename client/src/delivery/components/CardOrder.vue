<template>
  <div
    class="relative items-center px-2 my-2 transition-all duration-300 color-primary custom-rounded text-white cursor-pointer"
  >
    <div
      class="mb-1 p-4 no-underline text-white flex justify-between rounded "
      @click.prevent="active = !active"
    >
      <div class="title font-bold text-lg">Local: {{ order.Local.title }}</div>
      <div class="title font-bold text-lg">Cliente: {{ order.name }}</div>
      <span class="text-white" v-show="!active">
        <img
          :src="plus"
          alt="+"
          class="w-7"
          draggable="false"
      /></span>
      <span class="text-white" v-show="active">
        <img
          :src="minus"
          alt="-"
          class="w-7"
          draggable="false"
      /></span>
    </div>
    <div class="p-2" v-show="active">
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Calle:
        </div>
        <div class="title  text-lg">
          {{ order.street }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Número de telefono:
        </div>
        <div class="title  text-lg">
          {{ order.phoneNumber }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Número:
        </div>
        <div class="title  text-lg">
          {{ order.numberOfHouse }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Referencia:
        </div>
        <div class="title text-lg">
          {{ order.reference }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Método de pago:
        </div>
        <div class="title text-lg">
          {{ order.paymentMethod }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Notas adicionales:
        </div>
        <div class="title text-lg">
          {{ order.additionalNotes }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Edificio/Apto/Extensión:
        </div>
        <div class="title  text-lg">
          {{ order.apartment }}
        </div>
      </div>
      <hr />
      <OrderCartItem
        class="px-4 py-1 border border-solid border-gray-500 font-bold custom-rounded"
        v-for="cartItem in order.cartItems"
        :cartItem="cartItem"
        :key="cartItem.product.id"
      />
      <div class="px-2 flex flex-row justify-between">
        <button
          class="px-4 py-1 text-white font-bold bg-green-500 custom-rounded"
          @click="submitOrder(order.id)"
        >
          {{ buttonTitle }}
        </button>
        <div class="title font-bold text-lg">Total DOP: {{ cartTotal }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderCartItem from '@/_shared/cart/OrderCartItem'

import { currency } from '@/_helpers'

import plus from '@/_shared/assets/plus.png'
import minus from '@/_shared/assets/minus.png'

export default {
  name: 'CardOrder',

  components: { OrderCartItem },

  props: {
    order: { type: Object, required: true }
  },

  data () {
    return {
      active: false,
      plus: plus,
      minus: minus,
      isConfirmed: false
    }
  },

  methods: {
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
    }
  },

  computed: {
    buttonTitle () {
      return !this.isConfirmed ? 'Confirmar orden' : 'Orden entregada'
    },
    cartTotal () {
      return currency(
        this.order.cartItems.reduce(
          (total, current) => total + current.product.price * current.quantity,
          0
        )
      )
    }
  }
}
</script>
