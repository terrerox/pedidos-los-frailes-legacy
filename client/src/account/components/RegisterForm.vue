<template>
  <form class="grid grid-cols-2 gap-2" @submit.prevent="handleSubmit">
    <div class="col-span-2 lg:col-span-1">
      <material-input type="text" label="Nombre del local" v-model="email" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input type="text" label="Categoria" v-model="email" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input type="file" label="Imagen" v-model="email" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input type="text" label="Descripción" v-model="email" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input type="text" label="Correo" v-model="email" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input type="text" label="Contraseña" v-model="email" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input type="text" label="Dirección" v-model="email" />
    </div>
    <div class="col-span-2 lg:col-span-1">
      <material-input type="text" label="Teléfono" v-model="email" />
    </div>
    <div class="mt-10 col-span-2">
      <button
        class="color-primary text-gray-100 p-4 w-full rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
      >
        ¡Continuar!
      </button>
      <img
        v-show="status.loggingIn"
        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
      />
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'

export default {
  name: 'RegisterForm',

  components: { MaterialInput },

  data () {
    return {
      email: '',
      password: '',
      submitted: false
    }
  },
  computed: {
    ...mapState('account', ['status'])
  },
  created () {
    // reset login status
    this.logout()
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit (e) {
      this.submitted = true
      const { email, password } = this
      if (email && password) {
        this.login({ email, password })
      }
    }
  }
}
</script>

<style></style>
