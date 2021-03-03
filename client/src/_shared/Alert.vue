<template>
  <div
    v-if="alert.message"
    :class="`bg-${alertColor}-200 border border-${alertColor}-400
    text-${alertColor}-700`"
    class="pl-4 pr-8 py-3 rounded relative"
  >
    <strong class="font-bold">Error! </strong>
    <span class="block sm:inline">{{ alert.message }}</span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Alert',
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
    alertColor () {
      return this.alert.type === 'Error' ? 'red' : 'green'
    }
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear'
    })
  },
  watch: {
    $route (to, from) {
      // clear alert on location change
      this.clearAlert()
    }
  }
}
</script>

<style></style>
