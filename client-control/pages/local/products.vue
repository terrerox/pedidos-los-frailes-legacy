<template>
  <div>
    <ProductModal v-if="isModalVisible" :is-editing-id="isEditingId" @close="closeModal" />
    <div class="flex items-center">
      <button
        class="
        inline-block
        p-3
        text-center text-white
        transition
        color-primary
        rounded-full
        shadow
        ripple
        btn-hover
        focus:outline-none
        mr-4
      "
        @click="showModal"
      >
        <svg
          viewBox="0 0 20 20"
          enable-background="new 0 0 20 20"
          class="w-6 h-6"
        >
          <path
            fill="#ffff"
            d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
            C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
            C15.952,9,16,9.447,16,10z"
          />
        </svg>
      </button>
      <div class="text-center text-xl text-gray-800 leading-tight">
        Agregar producto
      </div>
    </div>
    <Loader v-if="status.isLoading" />
    <div v-else class="flex mx-auto lg:max-w-3xl xl:max-w-5xl">
      <div
        v-if="loggedProducts.length"
        class="flex flex-wrap justify-center w-full h-full mx-auto"
      >
        <div
          v-for="product in loggedProducts"
          :key="product.id"
          class="w-full py-10 px-5 md:w-1/2 xl:w-1/2"
        >
          <ProductOwner :product="product" @openModal="showModal" />
        </div>
      </div>
      <div v-else>
        <img
          class="w-full lg:w-1/2 m-auto mt-5 lg:mt-12"
          src="@/assets/img/empty.svg"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import plus from '@/assets/img/plus.png'
import Loader from '@/components/shared/Loader'
import ProductModal from '@/components/shared/ProductModal'

import ProductOwner from '@/components/local/ProductOwner'

export default {

  components: { ProductModal, ProductOwner, Loader },

  layout: 'local',

  middleware: 'authenticated',

  data () {
    return {
      plus,
      isModalVisible: false,
      isOwnerModalVisible: false,
      isEditingId: 0
    }
  },

  meta: {
    title: 'Productos'
  },

  head () {
    return {
      title: 'Productos | Pedidos Los Frailes Control',
      meta: [
        {
          hid: 'Productos',
          name: 'Productos',
          content: 'Revisa los productos de tu local'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  computed: {
    ...mapGetters('product', ['loggedProducts']),
    ...mapState('product', ['status'])
  },

  mounted () {
    this.getLoggedProducts()
  },

  methods: {
    ...mapActions('product', ['getLoggedProducts']),

    showOwnerModal () {
      this.isOwnerModalVisible = true
    },
    closeOwnerModal () {
      this.isOwnerModalVisible = false
    },
    showModal (isEditingId) {
      this.isModalVisible = true
      this.isEditingId = Number(isEditingId)
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>
