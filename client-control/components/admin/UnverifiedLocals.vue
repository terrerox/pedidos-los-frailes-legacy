<template>
  <div class="grid grid-cols-2 gap-2 rounded shadow-xl p-5">
    <div class="col-span-2">
      <div class="font-bold text-2xl max-w-xl text-gray-900 leading-tight">
        Verificar local
        <hr class="w-12 h-1 color-primary rounded-full mb-7 mt-1">
      </div>
    </div>
    <div v-if="unverifiedLocals.length" class="col-span-2">
      <template
        v-for="local in unverifiedLocals"
      >
        <UnverifiedLocalItem
          :key="local"
          :local="local"
        />
        <hr :key="local" class="col-span-2">
      </template>
    </div>
    <div v-else class="col-span-2">
      <h1 class="text-xl text-center">
        ¡No hay locales para verificar! 😬
      </h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UnverifiedLocalItem from './UnverifiedLocalItem'

export default {
  name: 'UnverifiedLocals',

  components: { UnverifiedLocalItem },

  computed: {
    ...mapGetters('local', ['unverifiedLocals'])
  },

  mounted () {
    this.getLocals()
  },

  methods: {
    ...mapActions('local', ['getLocals'])
  }
}
</script>

<style scoped>
</style>
