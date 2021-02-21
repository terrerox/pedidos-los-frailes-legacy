const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const orderService = require('./order.service');

// routes
router.post('/create', createSchema, create);
router.get('/', getAll);
router.get('/orders', authorize(), getRestaurantOrder);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        tel: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.string().required(),
        reference: Joi.string().required(),
        apartment: Joi.string().required(),
        additionalNotes: Joi.string().required(),
        paymentMethod: Joi.string().required(),
        cartItems: Joi.string().required(),
        RestaurantId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    // set restaurantid to body
    orderService.create(req.body)
        .then(() => res.json({ message: 'Orden creada con éxito' }))
        .catch(next);
}

function getAll(req, res, next) {
    orderService.getAll()
        .then(orders => res.json(orders))
        .catch(next);
}

function getRestaurantOrder(req, res, next) {
    const currentRestaurantId = req.restaurant.id
    orderService.getRestaurantOrder(currentRestaurantId)
        .then(orders => res.json(orders))
        .catch(next);
}

function getById(req, res, next) {
    orderService.getById(req.params.id)
        .then(order => res.json(order))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        tel: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.string().required(),
        reference: Joi.binary().required(),
        apartment: Joi.string().required(),
        additionalNotes: Joi.string().required(),
        cartItems: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    orderService.update(req.params.id, req.body)
        .then(order => res.json(order))
        .catch(next);
}

function _delete(req, res, next) {
    orderService.delete(req.params.id)
        .then(() => res.json({ message: 'Orden eliminada con éxito' }))
        .catch(next);
}