<template>
  <main class="mt-10 md:mt-0 md:h-screen grid place-content-center">
    <Header />
    <h2
      class="
            text-center text-2xl md:text-3xl text-gray-600
            leading-tight
          "
    >
      Bienvenido de nuevo, <br>
      ¡Te extrañamos!
    </h2>
    <section class="mt-8">
      <LoginForm />
    </section>
    <section class="text-center mt-8 text-gray-500 text-sm leading-relaxed">
      <div class="text-xs">
        &copy; {{ new Date().getFullYear() }} Alerta <span
          class="text-color-primary"
        > Los Frailes</span>
      </div>
    </section>
  </main>
</template>
<script>
import LoginForm from '../components/login/LoginForm'
import Header from '../components/login/Header'

export default {
  components: { LoginForm, Header },
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
    goToRegister () {
      this.$router.push('/register')
    }
  }
}
</script>
