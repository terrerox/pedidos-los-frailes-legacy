<template>
  <div class="px-4 lg:px-16">
    <Alert class="mb-8" />
    <UpdateDeliveryForm ref="deliveryForm" />
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
import { mapActions, mapState, mapGetters } from 'vuex'
import UpdateDeliveryForm from '@/components/delivery/UpdateDeliveryForm'
import Alert from '@/components/shared/Alert'
import Loader from '@/components/shared/Loader'
export default {
  name: 'DeliveryEditProfile',

  components: { UpdateDeliveryForm, Alert, Loader },

  layout: 'delivery',

  middleware: 'authenticated',

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
    ...mapState('delivery', ['status']),
    ...mapGetters('delivery', ['loggedDelivery'])
  },
  mounted () {
    this.getLoggedDelivery()
  },
  methods: {
    ...mapActions('delivery', ['getLoggedDelivery']),
    submitForm () {
      this.$refs.deliveryForm.submit()
    }
  }
}
</script>

<style scoped>
.combo { position: relative; }
.combo .trigger { position: absolute; right: 0%; top: 1px }
</style>
