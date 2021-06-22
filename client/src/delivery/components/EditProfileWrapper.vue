<template>
  <div class="grid grid-cols-2 gap-2 mb-7">
    <button
      class="text-gray-100 p-4 w-full rounded-full tracking-wide
      font-semibold font-display focus:outline-none focus:shadow-outline shadow-lg"
      :class="currentStep === 0 ? 'color-primary' : 'color-secondary text-gray-600'"
      type="button"
      @click="prevStep"
    >
      Cuenta
    </button>
    <button
      class="text-gray-100 p-4 w-full rounded-full tracking-wide
      font-semibold font-display focus:outline-none focus:shadow-outline shadow-lg"
      :class="currentStep === 1 ? 'color-primary' : 'color-secondary text-gray-600'"

      type="button"
      @click="nextStep"
    >
      Delivery
    </button>
  </div>
  <Alert class="mb-8" />
  <UpdateAccountForm ref="accountForm" v-if="currentStep === 0" />
  <UpdateDeliveryForm ref="deliveryForm" v-if="currentStep === 1" />
  <Loader v-if="status.isLoading"/>
  <div class="grid grid-cols-2 gap-2">
    <button
      class="bg-red-500 text-white hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
      type="button"
      style="transition: all .15s ease"
      @click="closeModal"
    >
      Cerrar
    </button>
    <button
      class="bg-green-500 text-white hover:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
      type="button"
      style="transition: all .15s ease"
      @click="submitForm"
    >
      Guardar cambios
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UpdateAccountForm from '@/delivery/components/UpdateAccountForm'
import UpdateDeliveryForm from '@/delivery/components/UpdateDeliveryForm'
import Alert from '@/_shared/Alert'
import Loader from '@/_shared/Loader'

export default {
  name: 'OwnerProfileForm',

  emits: ['close'],

  components: { UpdateAccountForm, UpdateDeliveryForm, Alert, Loader },

  data () {
    return {
      currentStep: 0
    }
  },
  created () {
    this.getLoggedDelivery()
  },

  computed: {
    ...mapState('delivery', ['status'])
  },

  methods: {
    ...mapActions('delivery', ['getLoggedDelivery']),

    closeModal () {
      this.$emit('close')
    },

    submitForm () {
      this.currentStep === 0
        ? this.$refs.accountForm.handleSubmit()
        : this.$refs.deliveryForm.handleSubmit()
    },

    nextStep () {
      if (this.currentStep === 1) {
        return
      }
      this.currentStep++
    },
    prevStep () {
      if (this.currentStep <= 0) {
        return
      }
      this.currentStep--
    }
  }
}
</script>

<style scoped>
.combo { position: relative; }
.combo .trigger { position: absolute; right: 0%; top: 1px }
</style>
