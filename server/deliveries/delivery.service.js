const db = require("_helpers/db");
const cloudinary = require('_helpers/cloudinary');

module.exports = {
    getAll,
    getById,
    update,
    create,
    delete: _delete
};

async function create(deliveryParams) {
    const cloudinaryResponse = await cloudinary.uploader.upload(deliveryParams.image, {
        folder: 'deliveries'
    });
    const cloudinaryContent = {
        imageUrl: cloudinaryResponse.secure_url,
        cloudinaryId: cloudinaryResponse.public_id
    }
    const { image, ...deliveryWithoutImage } = deliveryParams
    const delivery = { ...deliveryWithoutImage, ...cloudinaryContent }
    await db.Delivery.create(delivery);
}

async function getAll() {
    return await db.Delivery.findAll();
}

async function getById(id) {
    return await getDelivery(id);
}

async function update(id, params) {
    const delivery = await getDelivery(id);
    const { image, ...deliveryWithoutImage } = params

    if (params.image) {
        const cloudinaryResponse = await cloudinary.uploader.upload(params.image, {
            public_id: delivery.cloudinaryId
        });
        const cloudinaryContent = {
            imageUrl: cloudinaryResponse.secure_url
        }
        const updatedDelivery = { ...deliveryWithoutImage, ...cloudinaryContent }
        Object.assign(delivery, updatedDelivery);

    } else {
        Object.assign(delivery, deliveryWithoutImage);
    }

    await delivery.save();
  
    return omitHash(delivery.get());
}

async function _delete(id) {
    const delivery = await getDelivery(id);
    await delivery.destroy();
    await cloudinary.uploader.destroy(delivery.cloudinaryId);
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