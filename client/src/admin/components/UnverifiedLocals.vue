<template>
  <div class="grid grid-cols-2 gap-2 rounded shadow-xl p-5">
    <div class="col-span-2">
      <div class="font-bold text-2xl max-w-xl text-gray-900 leading-tight">
        Verificar local
        <hr class="w-12 h-1 color-primary rounded-full mb-7 mt-1" />
      </div>
    </div>
    <div class="col-span-2" v-if="unverifiedLocals.length">
      <template
        :key="local.id"
        v-for="local in unverifiedLocals"
      >
        <UnverifiedLocalItem
          :local="local"
        />
        <hr class="col-span-2"/>
      </template>
    </div>
    <div class="col-span-2" v-else>
      <h1 class="text-xl text-center">¡No hay locales para verificar! 😬</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UnverifiedLocalItem from '@/admin/components/UnverifiedLocalItem'

export default {
  name: 'UnverifiedLocals',

  components: { UnverifiedLocalItem },

  created () {
    this.getLocals()
  },

  methods: {
    ...mapActions('local', ['getLocals'])
  },

  computed: {
    ...mapGetters('local', ['unverifiedLocals'])
  }
}
</script>

<style scoped>
</style>
