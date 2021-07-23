<template>
  <div class="container">
    <div class="notes">
      <div
        v-for="order in orders"
        :key="order"
        class="note cursor-pointer"
        :style="'margin:'+margin()+ '; transform:'+ rotate() +'; background:'+color()+''"
      >
        <div class="details">
          <div class="title text-lg">
            {{ order.name }}
          </div>
          <div class="title  text-lg">
            {{ order.phoneNumber }}
          </div>
          <div class="title  text-lg">
            {{ order.street }}
          </div>
          <div class="title  text-lg">
            {{ order.additionalNotes }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
let i = 0
export default {
  name: 'LocalOrder',

  created () {
    this.getOrders()
  },

  computed: {
    ...mapGetters('order', ['orders'])
  },

  methods: {
    ...mapActions('order', ['getOrders']),

    margin () {
      const randomMargin = ['-5px', '1px', '5px', '10px', '15px', '20px']
      return randomMargin[Math.floor(Math.random() * randomMargin.length)]
    },

    rotate () {
      const randomDegree = ['rotate(3deg)', 'rotate(1deg)', 'rotate(-1deg)', 'rotate(-3deg)', 'rotate(-5deg)', 'rotate(-10deg)']
      return randomDegree[Math.floor(Math.random() * randomDegree.length)]
    },

    color () {
      const randomColors = ['#c2ff3d', '#ff3de8', '#3dc2ff', '#04e022', '#bc83e6', '#ebb328']
      if (i > randomColors.length - 1) {
        i = 0
      }
      return randomColors[i++]
    }
  }
}
</script>

<style scoped>
.notes{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

.note{
  width:300px;
  height:305px;
  transition: 2s;
  box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.507);
}

.note:hover {
  transform: scale(1.1);
}

.note h1{
  font-size: 1.5rem;
}

.details {
  margin-top: 25px;
  padding: 0 15px;
  font-size: 1.5rem;
}

.details i{
  color: whitesmoke;
  cursor: pointer;
  text-shadow: 1px 1px #BBB;
}

@media(max-width:1280px){
  .container{
    width: 95%;
  }
}

</style>
