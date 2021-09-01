<template>
  <div
    v-if="alert.message"
    :class="alert.type === 'Error'
      ? 'bg-red-200 border border-red-400 text-red-700'
      : 'bg-green-200 border border-green-400 text-green-700'
    "
    class="pl-4 pr-8 py-3 rounded relative"
  >
    <strong class="font-bold">{{ alert.type }}</strong>
    <span class="block sm:inline">ㅤ{{ alert.message }}</span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Alert',
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  watch: {
    $route (to, from) {
      // clear alert on location change
      this.clearAlert()
    }
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear'
    })
  }
}
</script>
