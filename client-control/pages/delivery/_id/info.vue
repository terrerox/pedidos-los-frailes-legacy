<template>
  <DeliveryInfoForm />
</template>

<script>
import DeliveryInfoForm from '@/components/delivery/DeliveryInfoForm'
export default {
  name: 'DeliveryInfo',

  components: { DeliveryInfoForm },

  middleware: 'authenticated'
}
</script>
