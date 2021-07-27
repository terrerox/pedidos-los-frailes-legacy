<template>
    <footer class="color-secondary mt-10 text-gray-600 leading-tight w-full py-6 px-4">
        <div class="flex items-center justify-between my-4">
            <div class="text-xs">
                &copy; {{ new Date().getFullYear() }} Alerta <span class="text-color-primary"
            > Los Frailes</span>
            </div>
            <p class="text-center mr-4">Para reportar problema contactar en <span class="text-color-primary">pedidoslosfrailes@gmail.com</span></p>
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
