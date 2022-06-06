<template>
  <Fragment>
    <div
      :class="sidebarOpen ? 'block' : 'hidden'"
      class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      @click="$emit('sidebarOpen')"
    />

    <div
      :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-white dark:bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 2xl:translate-x-0 2xl:static 2xl:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <span class="text-gray-800 text-2xl">Pedidos<span
            class="text-color-primary"
          > Los Frailes</span></span>
        </div>
      </div>

      <nav
        class="flex flex-col mt-10 px-4 text-center"
      >
        <nuxt-link
          v-for="item in items"
          :key="item.path"
          :to="item.path"
          class="mt-3 py-2 text-sm text-gray-600 hover:text-gray-700 rounded"
        >
          {{ item.title }}
        </nuxt-link>
      </nav>
      <PedidosLosFrailes class="flex justify-center" />
    </div>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import PedidosLosFrailes from '@/components/shared/PedidosLosFrailes'

export default {
  name: 'SideBar',

  components: { Fragment, PedidosLosFrailes },

  props: {
    sidebarOpen: { type: Boolean, required: true }
  },

  emits: ['sidebarOpen'],

  data () {
    return {
      items: [
        { title: 'Productos', path: 'products' },
        { title: 'Órdenes', path: 'orders' }
      ]
    }
  }
}
</script>

<style scoped>
.nuxt-link-active {
    background-color: #eff2fb;
}
</style>
