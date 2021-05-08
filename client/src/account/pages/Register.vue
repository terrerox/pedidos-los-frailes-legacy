<template>
  <!-- component -->
  <div class="lg:flex">
    <div class="lg:w-1/2 xl:max-w-screen-sm">
      <div
        class="py-12 color-secondary lg:bg-white flex justify-center lg:justify-start lg:px-12"
      >
        <div class="cursor-pointer flex items-center">
          <div>
            <svg
              class="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              style="enable-background:new 0 0 225 225;"
              xml:space="preserve"
            >
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    class="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div
            class="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold"
          >
            Pedidos Los Frailes
          </div>
        </div>
      </div>
      <div
        class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-5 xl:px-24 xl:max-w-2xl"
      >
        <h2
          class="text-center text-2xl text-indigo-900 font-display font-semibold lg:text-left xl:text-3xl
                    xl:text-bold"
        >
          Registrar
        </h2>
        <Alert />
        <div class="mt-12">
          <Test />
          <div
            class="my-5 sm:mt-10 md:mt-10 lg:mt-7 text-sm font-display font-semibold text-gray-700 text-center"
          >
            ¿Ya has registrado tu negocio?
            <router-link to="/login" class="cursor-pointer text-indigo-600 hover:text-indigo-800"
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
import Test from '../components/Test'

import Alert from '@/_shared/Alert'

export default {
  components: { Test, Alert }
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
