<template lang="pug">
button(@click="goToMenu(local.id)") {{ local.name }}
</template>

<script>
export default {
  name: 'Local',
  props: {
    local: { type: Object, required: true }
  },

  methods: {
    goToMenu (id) {
      this.$router.push({ name: 'Products', params: { id } })
    }
  }
}
</script>
