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
    <div class="col-span-2 lg:col-span-2 mt-2 pr-1">
      <material-input
        type="text"
        required
        label="Categoria"
        v-model="product.category"
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
    <div class="col-span-2 mt-2 combo">
      <img class="w-20 trigger object-cover object-center" :src="imageUrl+'/11'" alt="Avatar Upload" />
      <input
        type="file"
        accept="image/*"
        class="mb-10"
        @change="handleImage"
      />
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import MaterialInput from '@/_shared/inputs/MaterialInput'
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
        category: '',
        prepTimeValue: '',
        prepTimeUnit: '',
        imageUrl: '',
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
    ...mapGetters('product', {
      productForEdit: 'product'
    })
  },
  methods: {
    submitProduct () {
      if (this.validate(this.product)) {
        this.$swal('Debe de llenar todos los campos', '', 'warning')
        return
      }
      if (this.isEditingId) {
        this.updateProduct(this.product)
        this.$refs.form.reset()
        this.$swal('Actualizado', 'Producto actualizado con éxito', 'success')
        this.$emit('close')
        return
      }
      this.addProduct({
        title: this.product.title,
        image: this.product.image,
        price: this.product.price,
        category: this.product.category,
        prepTimeValue: this.product.prepTimeValue,
        prepTimeUnit: this.product.prepTimeUnit,
        restaurantId: this.product.restaurantId
      })
      this.$swal('Agregado', 'Producto agregado con éxito', 'success')
      this.$refs.form.reset()
      this.$emit('close')
    },

    ...mapActions('product', ['updateProduct', 'addProduct']),

    getProduct (productId) {
      this.$store.commit('product/setProduct', productId)
    },
    setProductForEdit () {
      this.product.id = this.productForEdit.id
      this.product.title = this.productForEdit.title
      this.product.price = this.productForEdit.price
      this.product.category = this.productForEdit.category
      this.product.prepTimeValue = this.productForEdit.prepTimeValue
      this.product.prepTimeUnit = this.productForEdit.prepTimeUnit
      this.product.restaurantId = this.productForEdit.restaurantId
      this.product.imageUrl = this.productForEdit.imageUrl
    },
    validate (obj) {
      return !Object.values(obj).every(element => element !== '')
    },
    handleImage (e) {
      const selectedImage = e.target.files[0] // get first file
      this.createBase64Image(selectedImage)
    },
    createBase64Image (fileObject) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.product.image = e.target.result
      }
      reader.readAsDataURL(fileObject)
    }
  }
}
</script>

<style scoped>
.combo { position: relative; }
.combo .trigger { position: absolute; right: 0%; top: 1px }
</style>
