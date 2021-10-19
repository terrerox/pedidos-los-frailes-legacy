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
    <UpdateAccountForm v-if="currentStep === 0" ref="accountForm" :logged-local="loggedLocal" />
    <UpdateLocalForm v-if="currentStep === 1" ref="localForm" />
    <Loader v-if="status.isLoading" />
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
import Alert from '@/components/shared/Alert'
import Loader from '@/components/shared/Loader'
import UpdateAccountForm from '@/components/local/UpdateAccountForm'
import UpdateLocalForm from '@/components/local/UpdateLocalForm'

export default {
  name: 'LocalEditProfile',

  components: { UpdateAccountForm, UpdateLocalForm, Alert, Loader },

  layout: 'local',

  middleware: 'not-authenticated',

  data () {
    return {
      currentStep: 0
    }
  },

  meta: {
    title: 'Perfil'
  },

  head () {
    return {
      title: 'Perfil | Pedidos Los Frailes Control',
      meta: [
        {
          hid: 'Perfil',
          name: 'Perfil',
          content: 'Actualiza tu perfil'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  computed: {
    ...mapState('local', ['status']),
    ...mapState('local', ['loggedLocal'])
  },

  mounted () {
    this.getLoggedLocal()
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
