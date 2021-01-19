import { httpClient } from './httpClient'

const productService = {}

productService.getAll = () => {
  return httpClient.get('/products')
    .then(res => res.data)
}

productService.getById = (id) => {
  return httpClient.get(`/products/${id}`)
    .then(res => res.data)
}

productService.addProduct = product => {
  return httpClient.post('/products', product)
}

productService.deleteProduct = id => {
  return httpClient.delete(`/products/${id}`)
}

export default productService
