
import { httpClient } from './httpClient'

const productService = {}

productService.getAll = () => {
  return httpClient.get('/products')
    .then(res => res)
}

productService.getLoggedProducts = () => {
  return httpClient.get('/products/current')
    .then(res => res)
}

productService.getById = (id) => {
  return httpClient.get(`/products/${id}`)
    .then(res => res)
}

productService.addProduct = (product) => {
  return httpClient.post('/products/create', product)
    .then(res => res)
}

productService.updateProduct = (product) => {
  return httpClient.put(`/products/${product.id}`, product)
    .then(res => res)
}

productService.deleteProduct = (id) => {
  return httpClient.delete(`/products/${id}`)
}

export default productService
