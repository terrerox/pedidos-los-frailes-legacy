<template>
  <LocalInfoForm />
</template>

<script>
import LocalInfoForm from '@/components/local/LocalInfoForm'
export default {
  name: 'LocalInfo',

  components: { LocalInfoForm },

  middleware: 'authenticated'
}
</script>
