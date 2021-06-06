const db = require('_helpers/db');
const cloudinary = require('_helpers/cloudinary');

module.exports = {
    getAll,
    getLocalProduct,
    getById,
    getImage,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getLocalProduct(localId) {
    return await db.Product.findAll({ where: { LocalAccountId: localId } });
}

async function getById(id) {
    return await getProduct(id);
}

async function getImage(id) {
    const img = await db.Product.findByPk(id);
    return img.dataValues.image
}

async function create(productParams) {
   const cloudinaryResponse = await cloudinary.uploader.upload(productParams.image, {
        folder: 'products'
    });
    const cloudinaryContent = {
        imageUrl: cloudinaryResponse.secure_url,
        cloudinaryId: cloudinaryResponse.public_id
    }
    const { image, ...productWithoutImage } = productParams
    const product = { ...productWithoutImage, ...cloudinaryContent }
    const newProduct = await db.Product.create(product);
    return newProduct.dataValues
}

async function update(id, params) {
    const product = await getProduct(id);
    const { image, ...productWithoutImage } = params

    if (params.image) {
        const cloudinaryResponse = await cloudinary.uploader.upload(params.image, {
            public_id: product.cloudinaryId
        });
        const cloudinaryContent = {
            imageUrl: cloudinaryResponse.secure_url
        }
        const updatedProduct = { ...productWithoutImage, ...cloudinaryContent }
        Object.assign(product, updatedProduct);

    } else {
        Object.assign(product, productWithoutImage);
    }
    // copy params to Product and save
    await product.save();

    return product.get();
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
    await cloudinary.uploader.destroy(product.cloudinaryId);
}

// helper functions

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Producto no encontrado';
    return product;
}