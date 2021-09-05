<template>
  <div>
    <Alert class="mb-5" />
    <form ref="form" class="grid grid-cols-2 gap-2">
      <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
        <material-input
          v-model="product.title"
          required
          label="Nombre del producto"
        />
      </div>
      <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
        <material-input
          v-model="product.price"
          required
          type="number"
          label="Precio"
        />
      </div>
      <div class="col-span-2 lg:col-span-2 mt-2 pr-1">
        <material-select
          v-model="product.category"
          :content="selectCategory"
          label="Categoria"
        />
      </div>
      <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
        <material-input
          v-model="product.prepTimeValue"
          required
          type="number"
          label="Valor de preparación"
        />
      </div>
      <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
        <material-select
          v-model="product.prepTimeUnit"
          :content="selectPrepTimeUnit"
          label="Unidad de preparación"
        />
      </div>
      <label>Imagen</label>
      <div class="col-span-2 mt-2 combo">
        <input
          type="file"
          accept="image/*"
          class="mb-10"
          @change="handleImage"
        >
      </div>
    </form>
    <Loader v-if="status.isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import MaterialInput from '../shared/MaterialInput'
import MaterialSelect from '../shared/MaterialSelect'
import Loader from '../shared/Loader'
import Alert from '../shared/Alert'

export default {
  name: 'ProductForm',

  components: { MaterialInput, MaterialSelect, Loader, Alert },

  props: {
    isEditingId: { type: Number, default: null }
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
      },
      selectPrepTimeUnit: ['minutos', 'horas'],
      selectCategory: ['Comida', 'Bebida', 'Fármaco']
    }
  },

  computed: {
    ...mapState('product', ['status']),
    ...mapGetters('product', {
      productForEdit: 'product'
    })
  },

  created () {
    if (this.isEditingId) {
      this.getProduct(this.isEditingId)
      this.setProductForEdit()
    }
  },

  methods: {
    submitProduct () {
      if (this.validate(this.product)) {
        this.$swal('Advertencia', 'Debe de llenar todos los campos', 'warning')
        return
      }
      if (this.isEditingId) {
        this.updateProduct(this.product)
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
      // this.$refs.form.reset()
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
