<template>
  <div v-cloak id="dribbleShot">
    <Header title="Confirmación" backTo="Shop"/>
    <section class="main">
      <div class="flex flex-col-reverse lg:flex-row">
        <div class="leading-loose m-5 flex-grow px-2 md:px-16 lg:px-16">
          <CheckoutForm :restaurantId="currentRestaurantId" />
        </div>
        <Cart
          :onCheckout="true"
          :restaurantId="currentRestaurantId"
        />
      </div>
    </section>
  </div>
</template>
<script>
import Header from '@/components/layout/Header'

import Cart from '@/components/cart/Cart'
import CheckoutForm from '@/components/forms/CheckoutForm'

export default {
  name: 'Checkout',

  components: { Cart, CheckoutForm, Header },

  data () {
    return {
      currentRestaurantId: Number(this.$route.params.id)
    }
  }
}
</script>
