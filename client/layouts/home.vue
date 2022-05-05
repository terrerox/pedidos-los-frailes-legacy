<template>
  <div class="background-canvas">
    <HomeHeader />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/shared/Footer'
import HomeHeader from '@/components/shared/HomeHeader'

export default {
  components: { Footer, HomeHeader },

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

<style scoped>
body * {
    font-family: 'Hammersmith One', sans-serif;
    /* background-color: #eff2fb; */
}
.background-canvas {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('@/assets/foodCanvas.svg');
  background-position: center;
  position: relative;
}
</style>
