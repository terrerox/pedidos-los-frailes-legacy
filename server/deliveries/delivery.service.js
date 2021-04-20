const db = require("_helpers/db");

module.exports = {
    getAll,
    getById,
    update,
    create,
    delete: _delete
};

async function create(params) {
    await db.Delivery.create(params);
}

async function getAll() {
    return await db.Delivery.findAll();
}

async function getById(id) {
    return await getDelivery(id);
}

async function update(id, params) {
    const delivery = await getDelivery(id);

    Object.assign(delivery, params);
    await delivery.save();
  
    return omitHash(delivery.get());
}

async function _delete(id) {
    const delivery = await getDelivery(id);
    await delivery.destroy();
}

// helper functions

async function getDelivery(id) {
    const delivery = await db.Delivery.findByPk(id);
    if (!delivery) throw 'Delivery no encontrado';
    return delivery;
}

function omitHash(delivery) {
    const { hash, ...deliveryWithoutHash } = delivery;
    return deliveryWithoutHash;
}