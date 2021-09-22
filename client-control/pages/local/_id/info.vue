<template>
  <LocalInfoForm />
</template>

<script>
import LocalInfoForm from '@/components/local/LocalInfoForm'
export default {
  name: 'LocalInfo',

  components: { LocalInfoForm },

  middleware: 'authenticated',
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
