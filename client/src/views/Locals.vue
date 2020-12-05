<template lang="pug">
div(v-for="local in locals")
  pf-local(:local="local")
</template>

<script>
import localDB from '@/api/db.js'

import pfLocal from '@/components/Local'

export default {
  name: 'Locals',
  components: { pfLocal },

  data () {
    return {
      locals: []
    }
  },

  created () {
    this.locals = localDB
  }

}
</script>
