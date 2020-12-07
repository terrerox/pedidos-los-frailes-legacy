<template>
  <div class="flex" v-cloak id="dribbleShot">
    <div class="main px-16 border-r border-gray-200">
      <pfHeader/>
      <router-view/>
    </div>
   <pfSidebar/>
  </div>
</template>

<script>
import pfHeader from '@/components/layout/Header'
import pfSidebar from '@/components/layout/Sidebar'

export default {
  name: 'App',
  components: { pfSidebar, pfHeader }
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
