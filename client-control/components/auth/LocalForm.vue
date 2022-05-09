<template>
  <form @submit.prevent="handleLogin(email)">
    <MaterialInput
      v-model="email"
      required
      type="email"
      label="Correo"
    />
    <div class="mt-10">
      <button
        class="flex justify-center color-primary text-gray-100 p-4 w-full rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
        type="submit"
      >
        <Loader v-show="isLoading" />
        <span v-show="!isLoading">Inicia sesión / Regístrate</span>
      </button>
    </div>
  </form>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import MaterialInput from '@/components/shared/MaterialInput'
import Loader from '@/components/shared/Loader'
export default {
  name: 'LoginForm',

  components: { MaterialInput, Loader },
  data () {
    return {
      email: ''
    }
  },

  computed: mapState('authentication', ['isLoading']),

  methods: mapActions('authentication', {
    handleLogin: 'login'
  })
}
</script>
