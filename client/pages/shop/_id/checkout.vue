<template>
  <div v-cloak id="dribbleShot">
    <Header title="Confirmación" backTo="shop-id"/>
    <section class="main">
      <div class="flex flex-col-reverse lg:flex-row">
        <div class="leading-loose m-5 flex-grow px-2 md:px-16 lg:px-16">
          <CheckoutForm />
        </div>
        <Cart
          :onCheckout="true"
        />
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Header from '@/components/shared/Header'
import Cart from '@/components/shared/cart/Cart'
import CheckoutForm from '@/components/checkout/CheckoutForm'
export default {
  name: 'Checkout',
  components: { Cart, CheckoutForm, Header },

  middleware: 'authenticated',

  head () {
    return {
      title: 'Checkout | Pedidos Los Frailes',
      meta: [
        {
          hid: 'Checkout',
          name: 'Checkout',
          content: 'Ingresa los datos de tu pedido'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  created () {
    const id = Number(this.$route.params.id)
    this.getLocal(id)
  },
  methods: {
    ...mapActions('local', ['getLocal'])
  }
}
</script>
