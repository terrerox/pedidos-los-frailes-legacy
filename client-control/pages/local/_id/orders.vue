<template>
  <div class="container">
    <Loader v-if="status.isLoading" />
    <div v-else>
      <div v-if="orders.length" class="notes">
        <div
          v-for="order in orders"
          :key="order"
          class="note cursor-pointer"
          :class="'transform ' + rotate()"
          :style="'margin:'+margin()+ '; background:'+color()+''"
        >
          <div class="details">
            <div class="title text-lg">
              {{ order.name }}
            </div>
            <div class="title text-lg">
              {{ order.phoneNumber }}
            </div>
            <div class="title text-lg">
              {{ order.paymentMethod }}
            </div>
            <div class="title text-lg">
              {{ order.additionalNotes }}
            </div>
            <div v-if="order.status === 'confirmed'" class="title text-lg">
              <strong>Orden confirmada</strong><br>
              Delivery -> {{ order.Delivery.name }} {{ order.Delivery.lastName }}
            </div>
            <div v-if="order.status === 'confirmed'" class="title text-base">
              # del Delivery -> {{ order.Delivery.phoneNumber }}
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
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center text-2xl text-gray-600 leading-tight">
          No hay ordenes
        </div>
        <img
          class="w-full lg:w-1/2 m-auto mt-5 lg:mt-12"
          src="@/assets/img/empty.svg"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { currency } from '@/helpers'
import OrderCartItem from '@/components/local/OrderCartItem'
import Loader from '@/components/shared/Loader'

let i = 0
export default {
  name: 'Orders',

  components: { OrderCartItem, Loader },

  layout: 'local',

  middleware: 'authenticated',

  meta: {
    title: 'Ordenes'
  },

  head () {
    return {
      title: 'Ordenes | Pedidos Los Frailes Control',
      meta: [
        {
          hid: 'Ordenes',
          name: 'Ordenes',
          content: 'Revisa las ordenes de tu local'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  computed: {
    ...mapGetters('order', ['orders']),
    ...mapState('order', ['status'])
  },

  created () {
    this.getOrders()
  },

  methods: {
    ...mapActions('order', ['getOrders']),

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

.details i{
  color: whitesmoke;
  cursor: pointer;
  text-shadow: 1px 1px #BBB;
}

@media(max-width:1280px){
  .container{
    width: 95%;
  }
}

</style>
