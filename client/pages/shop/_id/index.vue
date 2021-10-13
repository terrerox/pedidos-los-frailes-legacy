<template>
  <div v-cloak id="dribbleShot">
    <Header title="Tienda" back-to="index" />
    <Loader v-if="status.isLoading" />
    <template v-else>
      <section class="main">
        <HeroSection :hero-data="currentLocal" />
        <img class="w-full" src="@/assets/wave.svg" alt="">
        <div class="flex flex-col-reverse lg:flex-row color-secondary">
          <div class="lg:mt-0 mt-5 flex-grow px-7 md:px-16 lg:px-16">
            <div class="text-center text-2xl text-gray-600 leading-tight">
              {{ sectionTitle }}
            </div>
            <div class="flex mx-auto lg:max-w-3xl xl:max-w-5xl">
              <div
                v-if="currentLocal.Products.length"
                class="flex flex-wrap justify-center w-full h-full mx-auto"
              >
                <div
                  v-for="product in currentLocal.Products"
                  :key="product.id"
                  class="w-full py-10 px-5 md:w-1/2 xl:w-1/2"
                >
                  <Product :product="product" />
                </div>
              </div>
              <div v-else>
                <img class="w-full lg:w-1/2 m-auto mt-5 lg:mt-12" src="@/assets/empty.svg" alt="">
              </div>
            </div>
            <div
              class="sticky inset-x-0 bottom-0 mt-8 pb-2 lg:hidden"
              :class="cartItems.length ? '' : 'hidden'"
            >
              <nuxt-link
                class="block w-full px-6 py-4 text-xs font-medium leading-6 text-center text-white uppercase transition color-primary rounded shadow btn-hover focus:outline-none"
                :to="{ name: 'shop-id-checkout', params: { id: $route.params.id }}"
              >
                <div class="flex flex-row items-center">
                  <div class="text-left flex-1" />
                  <div class="flex-grow font-bold text-center">
                    Ordena ya
                  </div>
                  <div class="text-right text-xs flex-1">
                    $ {{ cartTotal }}
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="w-full lg:w-4/12 lg:mr-3">
            <Cart />
          </div>
        </div>
        <img class="w-full" src="@/assets/invertedWave.svg" alt="">
      </section>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Product from '@/components/shop/Product'
import Header from '@/components/shared/Header'
import Cart from '@/components/shared/cart/Cart'
import Loader from '@/components/shared/Loader'
import HeroSection from '@/components/shared/HeroSection'
import { currency } from '@/helpers'
export default {
  name: 'Shop',
  components: { Product, Cart, HeroSection, Header, Loader },
  data () {
    return {
      localId: 0,
      isLoading: true
    }
  },

  head () {
    return {
      title: 'Tienda | Pedidos Los Frailes',
      meta: [
        {
          hid: 'Tienda',
          name: 'Tienda',
          content: 'Observa los productos disponibles y haz tu pedido'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  computed: {
    ...mapGetters('local', {
      currentLocal: 'currentLocal'
    }),
    ...mapState('local', ['status']),
    sectionTitle () {
      return this.currentLocal.Products.length ? 'Productos 🍔' : 'No hay productos 😬'
    },
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
  },
  created () {
    const id = Number(this.$route.params.id)
    this.localId = id
    this.getLocal(id)
    this.isLoading = false
  },
  methods: {
    goToCheckout () {
      this.$router.push({ name: 'Checkout' })
    },
    ...mapActions('local', ['getLocal'])
  }
}
</script>
