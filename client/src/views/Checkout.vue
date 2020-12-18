<template>
  <div class="flex" v-cloak id="dribbleShot">
    <div class="main px-16 border-r border-gray-200">
      <Header />
      <div class="leading-loose m-5">
         <CheckoutForm/>
      </div>
    </div>
    <Cart :onCheckout="true" />
  </div>
</template>
<script>
import Cart from '@/components/cart/Cart'
import CheckoutForm from '@/components/forms/CheckoutForm'

import Header from '@/components/layout/Header'

export default {
  name: 'Checkout',

  components: { Cart, Header, CheckoutForm }
}
</script>
