<template>
  <div class="flex" v-cloak id="dribbleShot">
    <div class="main px-16 border-r border-gray-200">
      <Header/>
      <router-view/>
    </div>
   <Cart/>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
import Cart from '@/components/cart/Cart'

export default {
  name: 'App',
  components: { Cart, Header }
}
</script>

<style>
body * {
  font-family: "Poppins", sans-serif;
}
[v-cloak] {
  display: none;
}

.main {
  flex: 3;
}

.sidebar {
  flex: 1;
}

.custom-rounded {
  border-radius: 25px;
}

.custom-tr-rounded {
  border-radius: 0 25px 0 0;
}

.timer {
  background: rgba(217, 194, 105, 0.2);
}

.text-xxs {
  font-size: 0.7rem;
}
</style>
