<template>
  <form @submit.prevent="handleLogin">
    <MaterialInput
      v-model="email"
      required
      type="email"
      label="Correo"
    />
    <div class="mt-10">
      <button
        class="color-primary text-gray-100 p-4 w-full rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
        type="submit"
      >
        Inicia sesión
      </button>
    </div>
  </form>
</template>
<script>
import MaterialInput from '@/components/shared/MaterialInput'
export default {
  name: 'LoginForm',

  components: { MaterialInput },
  data () {
    return {
      email: ''
    }
  },

  head () {
    return {
      title: 'Login | Pedidos Los Frailes',
      meta: [
        {
          hid: 'Login',
          name: 'Login',
          content: 'Loguea para realizar pedidos'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  methods: {
    handleLogin () {
      this.$store
        .dispatch('authentication/login', {
          email: this.email
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
