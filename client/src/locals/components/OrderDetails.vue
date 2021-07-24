<template>
      <div
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
      >
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          <!--content-->
          <div
            class="shadow-lg relative flex flex-col w-full notes outline-none focus:outline-none"
            style="background: #ff3de8"
          >
            <!--header-->
            <div
              class="flex items-start justify-between rounded-t"
            >
              <button
                class="p-1 ml-auto border-0 text-gray-800 float-right text-3xl font-semibold outline-none focus:outline-none"
                @click="$emit('close')"
              >
                <span
                  class="h-6 w-6 text-2xl block outline-none focus:outline-none"
                >
                  x
                </span>
              </button>
            </div>
            <!--body-->
              <div
                class="note"
              >
                <div class="details">
                  <div class="title text-lg">
                    {{ details.name }}
                  </div>
                  <div class="title text-lg">
                    {{ details.phoneNumber }}
                  </div>
                  <div class="title text-lg">
                    {{ details.paymentMethod }}
                  </div>
                  <div class="title text-lg">
                    {{ details.additionalNotes }}
                  </div>
                  <div v-if="details.status === 'confirmed'">
                    <h2 class="font-bold">Delivery encargado</h2>
                    {{ details.delivery.name }}
                    {{ details.delivery.lastName }}
                  </div>
                  <div v-if="details.status === 'confirmed'">
                    <h2 class="font-bold">Número de teléfono del Delivery</h2>
                    {{ details.delivery.phoneNumber }}
                  </div>
                  <div class="title text-lg">
                      <OrderCartItem
                        v-for="cartItem in details.cartItems"
                        :cartItem="cartItem"
                        :key="cartItem.product.id"
                      />
                  </div>
                  <div class="float-right text-base">{{ cartTotal }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script>
import OrderCartItem from '@/locals/components/OrderCartItem'
import { currency } from '@/_helpers'

export default {
  name: 'OrderDetails',

  emits: ['close'],

  components: { OrderCartItem },

  props: {
    details: { type: Object, required: true }
  },

  methods: {
    closeModal () {
      this.$emit('close')
    }
  },

  computed: {
    cartTotal () {
      return currency(
        this.details.cartItems.reduce(
          (total, current) => total + current.product.price * current.quantity,
          0
        )
      )
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
  width:300px;
  height:305px;
  transition: all .2s ease-in-out;
}

.note h1{
  font-size: 1.5rem;
}

.details {
  margin-top: 25px;
  padding: 0 15px;
  font-size: 1.5rem;
}

.details i{
  color: whitesmoke;
  cursor: pointer;
  text-shadow: 1px 1px #BBB;
}
</style>
