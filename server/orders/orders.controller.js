const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const orderService = require('./order.service');

// routes
router.post('/create', createSchema, create);
router.get('/all', authorize(), getAll);
router.get('/', authorize(), getLocalOrder);
router.get('/delivery', authorize(), getDeliveryOrder);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        street: Joi.string().required(),
        numberOfHouse: Joi.string().required(),
        reference: Joi.string().required(),
        status: Joi.string().required(),
        apartment: Joi.string().required(),
        additionalNotes: Joi.string().required(),
        paymentMethod: Joi.string().required(),
        cartItems: Joi.string().required(),
        LocalAccountId: Joi.number().required(),
        DeliveryAccountId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    // set localid to body
    orderService.create(req.body)
        .then(() => res.json({ message: 'Orden creada con éxito' }))
        .catch(next);
}

function getAll(req, res, next) {
    orderService.getAll()
        .then(orders => res.json(orders))
        .catch(next);
}

function getLocalOrder(req, res, next) {
    const currentLocalId = req.local.id
    orderService.getLocalOrder(currentLocalId)
        .then(orders => res.json(orders))
        .catch(next);
}

function getDeliveryOrder(req, res, next) {
    console.log(req)
    const currentDeliveryId = req.delivery.id
    orderService.getDeliveryOrder(currentDeliveryId)
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
        name: Joi.string().empty(''),
        phoneNumber: Joi.string().empty(''),
        status: Joi.string().empty(''),
        street: Joi.string().empty(''),
        numberOfHouse: Joi.string().empty(''),
        reference: Joi.binary().empty(''),
        apartment: Joi.string().empty(''),
        DeliveryAccountId: Joi.number().empty(''),
        additionalNotes: Joi.string().empty(''),
        cartItems: Joi.string().empty('')
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