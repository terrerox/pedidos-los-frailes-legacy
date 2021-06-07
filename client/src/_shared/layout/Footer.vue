<template>
    <footer class="color-primary mt-10 text-white w-full py-6 px-4">
        <div class="flex items-center justify-between my-4">
            <p class="">ㅤ</p>
            <p class="text-center mr-4">Para reportar problema contactar en <span class=" text-red-400">pedidoslosfrailes@gmail.com</span></p>
            <div class="flex items-center">
                <a href="#">
                  <img class="h-6 w-6 fill-current mr-6" :src="instagramIcon" alt="instagram">
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
import instagram from '@/_shared/assets/instagram.svg'

export default {
  name: 'Footer',

  data () {
    return {
      instagramIcon: instagram
    }
  }
}
</script>

<style>

</style>
