<template lang="pug">
button(@click="goToMenu(local.name)") {{ local.name }}
</template>

<script>
export default {
  name: 'Local',
  props: {
    local: { type: Object, required: true }
  },

  methods: {
    goToMenu (name) {
      const test = name.replace(/ /g, '-').toLowerCase()
      this.$router.push({ name: 'Menu', params: { test } })
    }
  }
}
</script>
