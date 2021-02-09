const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(restaurantId) {
    return await db.Order.findAll({ where: { RestaurantId: restaurantId } });
}

async function getById(id) {
    return await getOrder(id);
}

async function create(params) {
    await db.Order.create(params);
}

async function update(id, params) {
    const order = await getOrder(id);
    // copy params to Order and save
    Object.assign(order, params);
    await order.save();

    return order.get();
}

async function _delete(id) {
    const order = await getOrder(id);
    await order.destroy();
}

// helper functions

async function getOrder(id) {
    const order = await db.Order.findByPk(id);
    if (!order) throw 'Order not found';
    return order;
}