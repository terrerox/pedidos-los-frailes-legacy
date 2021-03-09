const db = require('_helpers/db');

module.exports = {
    getAll,
    getRestaurantProduct,
    getById,
    getImage,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getRestaurantProduct(restaurantId) {
    return await db.Product.findAll({ where: { RestaurantId: restaurantId } });
}

async function getById(id) {
    return await getProduct(id);
}

async function getImage(id) {
    const img = await db.Product.findByPk(id);
    return img.dataValues.image
}

async function create(params) {
    const newProduct = await db.Product.create(params);
    return newProduct.dataValues
}

async function update(id, params) {
    const product = await getProduct(id);
    // copy params to Product and save
    Object.assign(product, params);
    await product.save();

    return product.get();
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

// helper functions

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Producto no encontrado';
    return product;
}

function omitImage(product) {
    const { image, ...productWithoutImage } = product;
    return productWithoutImage;
  }