const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(restaurantId) {
    return await db.Product.findAll({ where: { RestaurantId: restaurantId } });
}

async function getById(id) {
    return await getProduct(id);
}

async function create(params) {
    await db.Product.create(params);
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
    if (!product) throw 'Product not found';
    return product;
}