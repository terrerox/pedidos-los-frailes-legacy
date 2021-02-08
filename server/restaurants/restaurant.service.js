const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const restaurant = await db.Restaurant.scope('withHash').findOne({ where: { email } });

    if (!restaurant || !(await bcrypt.compare(password, restaurant.hash)))
        throw 'Email or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: restaurant.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(restaurant.get()), token };
}

async function getAll() {
    return await db.Restaurant.findAll();
}

async function getById(id) {
    return await getRestaurant(id);
}

async function create(params) {
    // validate
    if (await db.Restaurant.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save Restaurant
    await db.Restaurant.create(params);
}

async function update(id, params) {
    const restaurant = await getRestaurant(id);

    // validate
    const EmailChanged = params.email && restaurant.email !== params.email;
    if (EmailChanged && await db.Restaurant.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to Restaurant and save
    Object.assign(restaurant, params);
    await restaurant.save();

    return omitHash(restaurant.get());
}

async function _delete(id) {
    const restaurant = await getRestaurant(id);
    await restaurant.destroy();
}

// helper functions

async function getRestaurant(id) {
    const restaurant = await db.Restaurant.findByPk(id , {
        include: [db.Product]
    });
    if (!restaurant) throw 'Restaurant not found';
    return restaurant;
}

function omitHash(restaurant) {
    const { hash, ...RestaurantWithoutHash } = restaurant;
    return RestaurantWithoutHash;
}