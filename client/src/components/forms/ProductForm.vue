<template>
  <form class="grid grid-cols-2 gap-2" ref="form">
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Nombre del producto"
        v-model="product.title"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input required label="Precio" v-model="product.price" />
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
      <material-input required label="Categoria 2" v-model="product.cat2" />
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

  components: { MaterialInput },

  props: {
    isEditingId: { type: Number },
    resownerId: { type: Number, required: true }
  },

  data () {
    return {
      product: {
        id: 0,
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

  created () {
    if (this.isEditingId) {
      this.getProduct(this.isEditingId)
      this.setProductForEdit()
    }
  },
  computed: {
    productForEdit () {
      return this.$store.getters.product
    }
  },
  methods: {
    submitProduct () {
      if (this.validate(this.product)) {
        this.$swal('Debe de llenar todos los campos', '', 'warning')
        return
      }
      if (this.isEditingId) {
        this.$store.dispatch('updateProduct', this.product)
        this.$refs.form.reset()
        this.$swal('Actualizado', 'Producto actualizado con éxito', 'success')
        this.$emit('close')
        return
      }
      this.$store.dispatch('addProduct', {
        id: Date.now(),
        title: this.product.title,
        image: this.product.image,
        price: this.product.price,
        cat1: this.product.cat1,
        cat2: this.product.cat2,
        prepTimeValue: this.product.prepTimeValue,
        prepTimeUnit: this.product.prepTimeUnit,
        restaurantId: this.product.restaurantId
      })
      this.$swal('Agregado', 'Producto agregado con éxito', 'success')
      this.$refs.form.reset()
      this.$emit('close')
    },
    getProduct (productId) {
      this.$store.commit('setProduct', productId)
    },
    setProductForEdit () {
      this.product.id = this.productForEdit.id
      this.product.title = this.productForEdit.title
      this.product.price = this.productForEdit.price
      this.product.cat1 = this.productForEdit.cat1
      this.product.cat2 = this.productForEdit.cat2
      this.product.prepTimeValue = this.productForEdit.prepTimeValue
      this.product.prepTimeUnit = this.productForEdit.prepTimeUnit
      this.product.restaurantId = this.productForEdit.restaurantId
    },
    validate (obj) {
      return !Object.values(obj).every(element => element !== '')
    }
  }
}
</script>

<style></style>
