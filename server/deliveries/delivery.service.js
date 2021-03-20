const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const delivery = await db.Delivery.scope("withHash").findOne({
      where: { email },
    });
  
    if (!delivery || !(await bcrypt.compare(password, delivery.hash)))
      throw "Correo o contraseña incorrectas";
  
    // authentication successful
    const token = jwt.sign({ sub: delivery.id }, config.secret, {
      expiresIn: "7d",
    });
    return { ...omitHash(delivery.get()), token };
}

async function getAll() {
    return await db.Delivery.findAll();
}

async function getById(id) {
    return await getDelivery(id);
}


async function create(params) {
    // validate
    if (await db.Delivery.findOne({ where: { email: params.email } })) {
        throw 'Correo "' + params.email + '" ya existe';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save Delivery
    await db.Delivery.create(params);
}

async function update(id, params) {
    const delivery = await getDelivery(id);
  
    // validate
    const EmailChanged = params.email && delivery.email !== params.email;
    if (
      EmailChanged &&
      (await db.Delivery.findOne({ where: { email: params.email } }))
    ) {
      throw 'Correo "' + params.email + '" ya existe';
    }
  
    // hash password if it was entered
    if (params.password) {
      params.hash = await bcrypt.hash(params.password, 10);
    }
  
    // copy params to delivery and save
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