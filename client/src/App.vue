<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body * {
  font-family: 'Hammersmith One', sans-serif;
  /* background-color: #eff2fb; */
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
