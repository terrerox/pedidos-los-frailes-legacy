<template>
  <div class="px-4 lg:px-16">
    <div class="grid grid-cols-2 gap-2 mb-7">
      <button
        class="text-gray-100 p-4 w-full rounded-full tracking-wide
        font-display focus:outline-none focus:shadow-outline shadow-lg"
        :class="currentStep === 0 ? 'color-primary' : 'color-secondary text-gray-600'"
        type="button"
        @click="prevStep"
      >
        Cuenta
      </button>
      <button
        class="text-gray-100 p-4 w-full rounded-full tracking-wide
        font-display focus:outline-none focus:shadow-outline shadow-lg"
        :class="currentStep === 1 ? 'color-primary' : 'color-secondary text-gray-600'"
        type="button"
        @click="nextStep"
      >
        Local
      </button>
    </div>
    <Alert class="mb-8" />
    <UpdateAccountForm :loggedLocal="loggedLocal" ref="accountForm" v-if="currentStep === 0" />
    <UpdateLocalForm ref="localForm" v-if="currentStep === 1" />
    <Loader v-if="status.isLoading"/>
    <div class="mt-4 flex justify-center">
      <button
        class="bg-green-500 px-20 text-white hover:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style="transition: all .15s ease"
        @click="submitForm"
      >
        Guardar cambios
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UpdateAccountForm from '@/locals/components/UpdateAccountForm'
import UpdateLocalForm from '@/locals/components/UpdateLocalForm'
import Alert from '@/_shared/Alert'
import Loader from '@/_shared/Loader'

export default {
  name: 'LocalEditProfile',

  components: { UpdateAccountForm, UpdateLocalForm, Alert, Loader },

  data () {
    return {
      currentStep: 0
    }
  },

  created () {
    this.getLoggedLocal()
  },

  computed: {
    ...mapState('local', ['status']),
    ...mapState('local', ['loggedLocal'])
  },

  methods: {
    ...mapActions('local', ['getLoggedLocal']),

    submitForm () {
      this.currentStep === 0
        ? this.$refs.accountForm.submit()
        : this.$refs.localForm.submit()
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
