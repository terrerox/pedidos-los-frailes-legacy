const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
require('dotenv').config()

module.exports = {
  authenticate,
  create,
  update,
  getAll,
  getById,
  delete: _delete,
};

async function getAll() {
  return await db.Account.findAll();
}

async function getById(id) {
  return await getAccount(id);
}

async function authenticate({ userName, password }) {
  const account = await db.Account.scope("withHash").findOne({
    where: { userName },
  });

  if (!account || !(await bcrypt.compare(password, account.hash)))
    throw "Usuario o contraseña incorrectas";

  // authentication successful
  const token = jwt.sign({ sub: account.id }, process.env.SECRET_TOKEN, {
    expiresIn: "7d",
  });
  return { ...omitHash(account.get()), token };
}

async function create(params) {
    // validate
    if (await db.Account.findOne({ where: { userName: params.userName } })) {
        throw 'Usuario "' + params.userName + '" ya existe';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save account
    await db.Account.create(params);
}

async function update(id, params) {
    const account = await getAccount(id);
  
    // validate
    const userNameChanged = params.userName && account.userName !== params.userName;
    if (
      userNameChanged &&
      (await db.Account.findOne({ where: { userName: params.userName } }))
    ) {
      throw 'Usuario "' + params.userName + '" ya existe';
    }
  
    // hash password if it was entered
    if (params.password) {
      params.hash = await bcrypt.hash(params.password, 10);
    }
  
    // copy params to account and save
    Object.assign(account, params);
    await account.save();
  
    return omitHash(account.get());
}

async function _delete(id) {
    const account = await getAccount(id);
    await account.destroy();
}

async function getAccount(id) {
    const account = await db.Account.findByPk(id);
    if (!account) throw 'account no encontrado';
    return account;
}

function omitHash(account) {
    const { hash, ...accountWithoutHash } = account;
    return accountWithoutHash;
}