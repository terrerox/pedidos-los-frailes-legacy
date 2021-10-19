<template>
  <DeliveryInfoForm />
</template>

<script>
import DeliveryInfoForm from '@/components/delivery/DeliveryInfoForm'
export default {
  name: 'DeliveryInfo',

  components: { DeliveryInfoForm },

  middleware: 'not-authenticated',

  head () {
    return {
      title: 'Completa tu registro | Pedidos Los Frailes',
      meta: [
        {
          hid: 'Completa tu registro',
          name: 'Completa tu registro',
          content: 'Completa tu regitro para acceder al dashboard'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  }
}
</script>
