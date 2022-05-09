<template>
  <main class="mt-10 md:mt-0 md:h-screen grid place-content-center">
    <Header />
    <h2
      class="
            text-center text-2xl md:text-3xl text-gray-600
            leading-tight
          "
    >
      Bienvenido de nuevo, <br>
      ¡Te extrañamos!
    </h2>
    <section class="mt-8">
      <LocalForm />
    </section>
    <section class="flex justify-between text-xs mt-2">
      <div class="text-gray-600">
        ¿Eres delivery?
      </div>
      <nuxt-link to="/welcome-delivery">
        Inicia sesión o regístrate
      </nuxt-link>
    </section>
    <section class="text-center mt-8 text-gray-500 text-sm leading-relaxed">
      <PedidosLosFrailes />
    </section>
  </main>
</template>

<script>
import LocalForm from './LocalForm.vue'
import Header from '@/components/Header'
import PedidosLosFrailes from '@/components/shared/PedidosLosFrailes'

export default {
  name: 'LocalSection',
  components: { LocalForm, Header, PedidosLosFrailes }
}
</script>

<style>

</style>
