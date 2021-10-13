<template>
  <nuxt />
</template>

<script>
export default {
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
[v-cloak] {
    display: none;
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
.color-primary {
    background-color: #ec1f28;
}
.text-color-primary {
    color:#ec1f28;
}
.tooltip {
  background-color: #ec1f28;
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border: 1px solid black;
  border-radius: 6px;
}

.color-secondary {
    background-color: #eff2fb;
}
.btn-hover:hover {
    background-color: #ec1f28;
    @apply hover:shadow-xl;
}
.sidebar-btn:hover {
    background-color: #eff2fb;
}
</style>
