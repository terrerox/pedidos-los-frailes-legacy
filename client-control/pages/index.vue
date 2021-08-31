<template>
  <div>
    <h1>Testing</h1>
    <p> {{ verifiedLocals }} </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('local', ['verifiedLocals', 'unverifiedLocals'])
  },

  created () {
    this.getLocals()
  },

  methods: {
    ...mapActions('local', ['getLocals'])
  }
}
</script>
