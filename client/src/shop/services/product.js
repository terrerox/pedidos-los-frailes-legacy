import { httpClient } from '@/_helpers/index'

const productService = {}

productService.getAll = () => {
  return httpClient.get('/products')
    .then(res => res.data)
}

productService.getById = id => {
  return httpClient.get(`/products/${id}`)
    .then(res => res.data)
}

productService.addProduct = product => {
  return httpClient.post('/products', product)
}

productService.updateProduct = product => {
  return httpClient.put(`/products/${product.id}`, product)
    .then(res => res.data)
}

productService.deleteProduct = id => {
  return httpClient.delete(`/products/${id}`)
}

export default productService
