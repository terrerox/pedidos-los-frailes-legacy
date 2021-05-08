<template>
  <div v-cloak id="dribbleShot">
    <OwnerHeader @openModal="showOwnerModal" />
    <section class="main">
      <EditProfileModal v-show="isOwnerModalVisible" @close="closeOwnerModal"/>
      <HeroSection :heroData="loggedDelivery.Delivery" />
      <div class="flex flex-col-reverse lg:flex-row">
        <div class="flex-grow px-7 md:px-16 lg:px-16">
          <div class="mt-12">
            <DeliveryInfo />
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

import CardHolder from '@/delivery/components/CardHolder'
import DeliveryInfo from '@/delivery/components/DeliveryInfo'

import HeroSection from '@/delivery/components/HeroSection'
import OwnerHeader from '@/_shared/layout/OwnerHeader'
import EditProfileModal from '@/delivery/components/EditProfileModal'

export default {
  name: 'Shop',

  components: {
    DeliveryInfo,
    CardHolder,
    HeroSection,
    OwnerHeader,
    EditProfileModal
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
    this.getLoggedDelivery()
    // this.getLoggedProducts()
    // const orderId = Number(this.$route.params.id)
    // this.getOrder(orderId)
  },

  methods: {
    ...mapActions('order', ['getOrder']),
    ...mapActions('delivery', ['getLoggedDelivery']),
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
    ...mapGetters('delivery', ['loggedDelivery']),
    ...mapGetters('product', ['loggedProducts']),
    ...mapGetters('order', ['order'])
  }
}
</script>
