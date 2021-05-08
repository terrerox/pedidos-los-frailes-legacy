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
      <material-input
        required
        type="number"
        label="Precio"
        v-model="product.price"
      />
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
        type="number"
        label="Valor de preparación"
        v-model="product.prepTimeValue"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <label>Unidad de preparación</label>
      <div class="relative inline-flex">
        <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
        <select
          v-model="product.prepTimeUnit"
          class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        >
          <option selected="selected" hidden="hidden">Unidad de preparación</option>
          <option value="minutos">Minutos</option>
          <option value="horas">Horas</option>
        </select>
      </div>
    </div>
    <label>Imagen</label>
    <div class="col-span-2 mt-2 combo">
      <img class="w-20 trigger object-cover object-center" :src="product.image" alt="Foto del producto" />
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
    isEditingId: { type: Number }
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
        prepTimeUnit: ''
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
        this.$swal('Advertencia', 'Debe de llenar todos los campos', 'warning')
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
        prepTimeUnit: this.product.prepTimeUnit
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
      this.product.image = this.productForEdit.image
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
