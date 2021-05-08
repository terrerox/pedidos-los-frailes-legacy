<template>
  <div v-cloak id="dribbleShot">
    <OwnerHeader @openModal="showOwnerModal" />
    <section class="main">
      <ProductModal v-if="isModalVisible" @close="closeModal" :isEditingId="isEditingId"/>
      <OwnerProfileModal v-show="isOwnerModalVisible" @close="closeOwnerModal"/>
      <HeroSection :heroData="loggedLocal.Local" />
      <div class="flex flex-col-reverse lg:flex-row">
        <div class="flex-grow px-7 md:px-16 lg:px-16">
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
              v-for="(product, $index) in loggedProducts"
              :key="product.id"
            >
              <ProductOwner :index="$index" :product="product" @openModal="showModal" />
            </div>
          </div>
        </div>
        <div class="w-full lg:w-4/12 lg:mr-3">
          <CardHolder />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import plus from '@/_shared/assets/plus.png'

import ProductOwner from '@/locals/components/ProductOwner'
import CardHolder from '@/locals/components/CardHolder'

import HeroSection from '@/locals/components/HeroSection'
import OwnerHeader from '@/_shared/layout/OwnerHeader'
import ProductModal from '@/_shared/modals/ProductModal'
import OwnerProfileModal from '@/locals/components/EditProfileModal'

export default {
  name: 'Shop',

  components: {
    ProductOwner,
    CardHolder,
    HeroSection,
    OwnerHeader,
    ProductModal,
    OwnerProfileModal
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
    ...mapGetters('product', ['loggedProducts'])
  }
}
</script>
