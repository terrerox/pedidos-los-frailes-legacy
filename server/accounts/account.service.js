const jwt = require("jsonwebtoken");
const db = require("_helpers/db");
require('dotenv').config()

module.exports = {
  join,
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

async function join({ email, role }) {
  const account = await db.Account.findOne({
    where: { email },
  });

  if(!account) {
    const account = await db.Account.create({ email, role });
    const { id } = account.dataValues
    const token = generateToken(id)
    return { token }
  }

  const { id } = account.dataValues
  const token = generateToken(id)
  return { token }
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

function generateToken(id) {
  return jwt.sign({ sub: id }, process.env.SECRET_TOKEN, {
    expiresIn: "7d",
  });
}