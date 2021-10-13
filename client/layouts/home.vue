<template>
  <Fragment>
    <nuxt />
    <Footer />
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Footer from '@/components/shared/Footer'

export default {
  components: { Footer, Fragment },

  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap'
        }
      ]
    }
  }
}
</script>

<style>
body * {
    font-family: 'Hammersmith One', sans-serif;
    /* background-color: #eff2fb; */
}
</style>
