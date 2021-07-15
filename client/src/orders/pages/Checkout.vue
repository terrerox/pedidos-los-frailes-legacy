<template>
  <div v-cloak id="dribbleShot">
    <Header title="Confirmación" backTo="Shop"/>
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

import Header from '@/_shared/layout/Header'

import Cart from '@/_shared/cart/Cart'
import CheckoutForm from '@/orders/components/CheckoutForm'

export default {
  name: 'Checkout',

  components: { Cart, CheckoutForm, Header },

  created () {
    const id = Number(this.$route.params.id)
    this.getLocal(id)
  },

  methods: {
    ...mapActions('local', ['getLocal'])
  }
}
</script>
