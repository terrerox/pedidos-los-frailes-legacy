const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Local.findAll();
}

async function getById(id) {
  return await getLocal(id);
}

async function update(id, params) {
  const local = await getLocal(id);

  // validate
  const EmailChanged = params.email && local.email !== params.email;
  if (
    EmailChanged &&
    (await db.Local.findOne({ where: { email: params.email } }))
  ) {
    throw 'Correo "' + params.email + '" ya existe';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to Local and save
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
