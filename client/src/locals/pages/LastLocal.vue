<template>
  <div v-cloak id="dribbleShot">
    <OwnerHeader @openModal="showOwnerModal" />
    <section class="main">
      <ProductModal v-if="isModalVisible" @close="closeModal" :isEditingId="isEditingId"/>
      <EditProfileModal v-show="isOwnerModalVisible" @close="closeOwnerModal"/>
      <HeroSection :heroData="loggedLocal.Local" />
      <img class="w-full" src="@/_shared/assets/wave.svg" alt="" />
      <div class="flex flex-col-reverse lg:flex-row color-secondary">
        <div class="lg:mt-0 mt-5 flex-grow px-7 md:px-16 lg:px-16">
            <div class="mt-12 flex items-center">
              <button
                @click="showModal"
                class="inline-block p-3 text-center text-white transition color-primary rounded-full shadow ripple btn-hover focus:outline-none mr-4"
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
              <div class="text-center text-2xl text-gray-600 leading-tight">
                {{ sectionTitle }}
              </div>
            </div>
            <div class="flex mx-auto lg:max-w-3xl xl:max-w-5xl">
              <div
                class="flex flex-wrap justify-center w-full h-full mx-auto"
                v-if="loggedProducts.length"
              >
                <div
                  class="w-full py-10 px-5 md:w-1/2 xl:w-1/2"
                  v-for="product in loggedProducts"
                  :key="product.id"
                >
                  <ProductOwner :product="product" @openModal="showModal" />
                </div>
              </div>
              <div v-else>
                <img class="w-full lg:w-1/2 m-auto mt-5 lg:mt-12" src="@/_shared/assets/empty.svg" alt="" />
              </div>
            </div>
      </div>
        <div class="w-full lg:w-4/12 lg:mr-3">
          <CardHolder />
        </div>
      </div>
      <img class="w-full" src="@/_shared/assets/invertedWave.svg" alt="" />
    </section>
  </div>
  <Footer />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import plus from '@/_shared/assets/plus.png'

import ProductOwner from '@/locals/components/ProductOwner'
import CardHolder from '@/locals/components/CardHolder'

import HeroSection from '@/locals/components/HeroSection'
import OwnerHeader from '@/_shared/layout/OwnerHeader'
import ProductModal from '@/_shared/modals/ProductModal'
import EditProfileModal from '@/locals/components/EditProfileModal'
import Footer from '@/_shared/layout/Footer'

export default {
  name: 'Shop',

  components: {
    ProductOwner,
    CardHolder,
    HeroSection,
    OwnerHeader,
    ProductModal,
    EditProfileModal,
    Footer
  },

  data () {
    return {
      plus: plus,
      isModalVisible: false,
      isOwnerModalVisible: false,
      isEditingId: 0
    }
  },

  created () {
    this.getLoggedLocal()
    this.getLoggedProducts()
  },

  methods: {
    ...mapActions('local', ['getLoggedLocal']),
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
  },

  computed: {
    ...mapGetters('local', ['loggedLocal']),
    ...mapGetters('product', ['loggedProducts']),
    sectionTitle () {
      return this.loggedProducts.length ? 'Productos 🍔' : '¡No hay productos! 😬'
    }
  }
}
</script>
