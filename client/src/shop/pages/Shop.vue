<template>
  <div v-cloak id="dribbleShot">
    <Header title="Tienda" backTo="Home"/>
    <section class="main">
      <HeroSection :heroData="currentLocal" />
      <div class="flex flex-col-reverse lg:flex-row">
        <div class="flex-grow px-7 md:px-16 lg:px-16">
          <div class="mt-12 flex items-center">
            <h3 class="text-xl font-bold">
              Productos
            </h3>
            <img
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/hamburger_1f354.png"
              class="mx-4 h-8 w-8"
              alt=""
            />
          </div>
          <div
            class="mt-12 mb-7 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10"
          >
            <div
              class="flex flex-col"
              v-for="product in currentLocal.Products"
              :key="product.id"
            >
              <Product :product="product" />
            </div>
          </div>
          <div
            class="sticky inset-x-0 bottom-0 mt-8 pb-2 lg:hidden"
            :class="cartItems.length ? '' : 'hidden'"
          >
            <router-link
              class="block w-full px-6 py-4 text-xs font-medium leading-6 text-center text-white uppercase transition color-primary rounded shadow btn-hover focus:outline-none"
              :to="{ name: 'Checkout' }"
            >
              <div class="flex flex-row items-center">
                <div class="text-left flex-1"></div>
                <div class="flex-grow font-bold text-center">
                  Ordena ya
                </div>
                <div class="text-right text-xs flex-1">
                  $ {{ cartTotal }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="w-full lg:w-4/12 lg:mr-3">
          <Cart :localId="localId" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Product from '@/shop/components/Product'
import Cart from '@/_shared/cart/Cart'

import HeroSection from '@/_shared/layout/HeroSection'
import Header from '@/_shared/layout/Header'

import { currency } from '@/_helpers'

export default {
  name: 'Shop',

  components: { Product, Cart, HeroSection, Header },

  data () {
    return {
      localId: 0
    }
  },

  created () {
    const id = Number(this.$route.params.id)
    this.localId = id
    this.getLocal(id)
  },

  methods: {
    goToCheckout () {
      this.$router.push({ name: 'Checkout' })
    },
    ...mapActions('local', ['getLocal'])
  },

  computed: {
    ...mapGetters('local', {
      currentLocal: 'currentLocal'
    }),

    cartItems () {
      return this.$store.getters['cart/productsOnCart'].filter(
        item => item.product.LocalAccountId === this.localId
      )
    },
    cartTotal () {
      return currency(
        this.cartItems.reduce(
          (total, current) => total + current.product.price * current.quantity,
          0
        )
      )
    }
  }
}
</script>
