const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  update,
  create,
  delete: _delete,
};

async function create(params) {
    await db.Local.create(params);
}

async function getAll() {
  return await db.Local.findAll();
}

async function getById(id) {
  return await getLocal(id);
}

async function update(id, params) {
  const local = await getLocal(id);

  Object.assign(local, params);
  await local.save();

  return omitHash(local.get());
}

async function _delete(id) {
  const local = await getLocal(id);
  await local.destroy();
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
  if (!local) throw "Locale no encontrado";
  return local;
}

function omitHash(local) {
  const { hash, ...LocalWithoutHash } = local;
  return LocalWithoutHash;
}
