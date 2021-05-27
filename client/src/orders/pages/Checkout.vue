<template>
  <div v-cloak id="dribbleShot">
    <Header title="Confirmación" backTo="Shop"/>
    <section class="main">
      <div class="flex flex-col-reverse lg:flex-row">
        <div class="leading-loose m-5 flex-grow px-2 md:px-16 lg:px-16">
          <CheckoutForm :localId="currentLocalId" />
        </div>
        <Cart
          :onCheckout="true"
          :localId="currentLocalId"
        />
      </div>
    </section>
  </div>
</template>
<script>
import Header from '@/_shared/layout/Header'

import Cart from '@/_shared/cart/Cart'
import CheckoutForm from '@/orders/components/CheckoutForm'

export default {
  name: 'Checkout',

  components: { Cart, CheckoutForm, Header },

  data () {
    return {
      currentLocalId: Number(this.$route.params.id)
    }
  }
}
</script>
