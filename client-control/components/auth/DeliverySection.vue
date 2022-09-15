<template>
  <main class="mt-10 md:mt-0 md:h-screen grid place-content-center">
    <Header />
    <h2
      class="block lg:hidden
            text-center text-2xl md:text-3xl text-gray-600
            leading-tight
          "
    >
      Los mejores <br>
      <span class="text-color-primary">deliveries</span> del mundo.
    </h2>
    <section class="mt-8">
      <DeliveryForm />
    </section>
    <section class="flex justify-between text-xs mt-2">
      <div class="text-gray-600">
        ¿Tienes un local?
      </div>
      <nuxt-link to="/">
        Inicia sesión o regístrate
      </nuxt-link>
    </section>
    <section class="text-center mt-8 text-gray-500 text-sm leading-relaxed">
      <PedidosLosFrailes />
    </section>
    <button
      v-show="!isInstalled"
      class="text-xs md:text-sm text-gray-500 p-2 rounded-full
                font-semibold font-display focus:outline-none focus:shadow-outline shadow-lg"
      @click="installPWA"
    >
      Instala la app
    </button>
  </main>
</template>

<script>
import DeliveryForm from './DeliveryForm.vue'
import Header from '@/components/Header'
import PedidosLosFrailes from '@/components/shared/PedidosLosFrailes'

export default {
  name: 'DeliverySection',
  components: { DeliveryForm, Header, PedidosLosFrailes },
  props: {
    isInstalled: Boolean,
    installPWA: Function
  }
}
</script>

<style>

</style>
