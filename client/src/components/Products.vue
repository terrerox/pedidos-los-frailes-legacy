<template lang="pug">
div(v-for="product in products")
  span {{product.name}}
</template>

<script>
import localDB from '@/api/db.js'

export default {
  name: 'Products',
  data () {
    return {
      products: []
    }
  },

  created () {
    const id = Number(this.$route.params.id)
    const result = localDB.find(local => local.id === id)
    this.products = result.products
  }
}
</script>
