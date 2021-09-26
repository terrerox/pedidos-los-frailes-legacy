const productService = {}

productService.getAll = (api) => {
  return api.get('/products')
    .then(res => res)
}

productService.getLoggedProducts = (api) => {
  return api.get('/products/current')
    .then(res => res)
}

productService.getById = (id, api) => {
  return api.get(`/products/${id}`)
    .then(res => res)
}

productService.addProduct = (product, api) => {
  return api.post('/products/create', product)
    .then(res => res)
}

productService.updateProduct = (product, api) => {
  return api.put(`/products/${product.id}`, product)
    .then(res => res)
}

productService.deleteProduct = (id, api) => {
  return api.delete(`/products/${id}`)
}

export default productService
