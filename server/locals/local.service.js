const db = require("_helpers/db");
const cloudinary = require('_helpers/cloudinary');


module.exports = {
  getAll,
  getById,
  update,
  create,
  delete: _delete,
};

async function create(newLocal) {
  const cloudinaryResponse = await cloudinary.uploader.upload(newLocal.image, {
    folder: 'locals'
  });
  const cloudinaryContent = {
    imageUrl: cloudinaryResponse.secure_url,
    cloudinaryId: cloudinaryResponse.public_id
  }
  const { image, ...localWithoutImage } = newLocal
  const local = { ...localWithoutImage, ...cloudinaryContent }
  await db.Local.create(local);
}

async function getAll() {
  return await db.Local.findAll({ include: db.Account });
}

async function getById(id) {
  return await getLocal(id);
}

async function update(id, params) {
  const local = await getLocal(id);
  const { image, ...localWithoutImage } = params

  if (params.image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(params.image, {
          public_id: local.cloudinaryId
      });
      const cloudinaryContent = {
          imageUrl: cloudinaryResponse.secure_url
      }
      const updatedLocal = { ...localWithoutImage, ...cloudinaryContent }
      Object.assign(local, updatedLocal);

  } else {
      Object.assign(local, localWithoutImage);
  }
  await local.save();

  return omitHash(local.get());
}

async function _delete(id) {
  const local = await getLocal(id);
  await local.destroy();
  await cloudinary.uploader.destroy(local.cloudinaryId);
}

// helper functions

async function getLocal(id) {
  const local = await db.Local.findByPk(id, {
    include: [
      {
        model: db.Product,
        as: "Products"
      },
    ],
  }
  );
  if (!local) throw "Local no encontrado";
  return local;
}

function omitHash(local) {
  const { hash, ...LocalWithoutHash } = local;
  return LocalWithoutHash;
}
