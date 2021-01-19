<template>
  <form class="grid grid-cols-2 gap-2">
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Nombre del producto"
        v-model="product.title"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Precio"
        v-model="product.price"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        type="text"
        required
        label="Categoria 1"
        v-model="product.cat1"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Categoria 2"
        v-model="product.cat2"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        label="Valor de preparación"
        v-model="product.prepTimeValue"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        label="Unidad de preparación"
        v-model="product.prepTimeUnit"
      />
    </div>
    <div class="col-span-2 mt-2">
      <material-input
        required
        type="file"
        label="Foto del producto"
        v-model="product.image"
      />
    </div>
  </form>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput'
export default {
  name: 'ProductForm',

  props: {
    isEditing: { type: Number },
    resownerId: { type: Number, required: true }
  },

  data () {
    return {
      product: {
        title: '',
        image: '',
        price: '',
        cat1: '',
        cat2: '',
        prepTimeValue: '',
        prepTimeUnit: '',
        restaurantId: this.resownerId
      }
    }
  },

  methods: {
    submitProduct () {
      if (this.isEditing) {
        console.log('editing')
        return
      }
      this.$store.dispatch('addProduct', this.product)
    }
  },
  components: { MaterialInput }
}
</script>

<style>

</style>
