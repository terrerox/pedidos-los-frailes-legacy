<template>
  <div v-cloak id="dribbleShot">
    <OwnerHeader @openModal="showOwnerModal" />
    <section class="main">
      <EditProfileModal v-show="isOwnerModalVisible" @close="closeOwnerModal"/>
      <HeroSection :heroData="loggedDelivery.Delivery" />
      <div class="flex flex-col-reverse lg:flex-row">
        <div class="flex-grow px-7 md:px-16 lg:px-16">
          <div class="mt-12">
            <Loader v-if="isLoading"/>
            <TableInfo v-else/>
          </div>
        </div>
        <div class="w-full lg:w-4/12 lg:mr-3">
          <CardHolder />
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import plus from '@/_shared/assets/plus.png'
import Loader from '@/_shared/Loader'

import CardHolder from '@/delivery/components/CardHolder'
import TableInfo from '@/delivery/components/TableInfo'

import HeroSection from '@/delivery/components/HeroSection'
import OwnerHeader from '@/_shared/layout/OwnerHeader'
import EditProfileModal from '@/delivery/components/EditProfileModal'
import Footer from '@/_shared/layout/Footer'

export default {
  name: 'Shop',

  components: {
    TableInfo,
    CardHolder,
    HeroSection,
    OwnerHeader,
    EditProfileModal,
    Loader,
    Footer
  },

  data () {
    return {
      plus: plus,
      isModalVisible: false,
      isOwnerModalVisible: false,
      isEditingId: 0,
      isLoading: true
    }
  },

  created () {
    this.getLoggedDelivery()
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  },

  methods: {
    ...mapActions('delivery', ['getLoggedDelivery']),

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
    ...mapGetters('delivery', ['loggedDelivery'])
  }
}
</script>
