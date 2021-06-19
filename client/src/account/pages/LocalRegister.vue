<template>
  <!-- component -->
  <div class="lg:flex">
    <div class="lg:w-1/2 xl:max-w-screen-sm">
      <Header />
      <div
        class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-5 xl:px-24 xl:max-w-2xl"
      >
        <h2
          class="text-center text-2xl font-display text-gray-600 leading-tight lg:text-left xl:text-3xl"
        >
          Registrar Local
        </h2>
        <Alert />
        <div class="mt-12">
          <LocalRegisterForm />
          <div
            class="my-5 sm:mt-10 md:mt-10 lg:mt-7 text-sm font-display font-semibold text-gray-700 text-center"
          >
            ¿Ya has registrado tu negocio?
            <router-link to="/login" class="cursor-pointer text-color-primary"
              >¡Inicia sesión aqui!</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="hidden lg:flex items-center justify-center color-secondary flex-1 h-screen"
    >
      <div
        class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer"
      >
        <img src="@/_shared/assets/chef.svg" alt="Chef" />
      </div>
    </div>
  </div>
</template>

<script>
import LocalRegisterForm from '../components/LocalRegisterForm'
import Header from '../components/Header'

import Alert from '@/_shared/Alert'

export default {
  components: { LocalRegisterForm, Alert, Header }
}
</script>

<style type="text/css" scoped>
.st0 {
  fill: none;
  stroke: currentColor;
  stroke-width: 20;
  stroke-linecap: round;
  stroke-miterlimit: 3;
}
</style>
