const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const deliveryService = require('./delivery.service');

// routes
router.post('/create', authorize(Role.Delivery), createSchema, create);
router.get('/all', getAll);
router.get('/logged',  authorize(Role.Delivery), getLogged);
router.get('/:id', getById);
router.put('/:id', updateSchema, update);
router.delete('/:id', authorize(Role.Delivery), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        accountId: Joi.number().required(),
        name: Joi.string().required(),
        nationalId: Joi.string().required(),
        lastName: Joi.string().required(),
        status: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        imageUrl: Joi.string().required(),
        image: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    req.body.imageUrl = `${req.protocol}://${req.headers.host}/locals/img/`
    deliveryService.create(req.body)
        .then(() => res.json({ message: 'Registrado con éxito' }))
        .catch(next);
}

function getAll(req, res, next) {
    deliveryService.getAll()
        .then(deliveries => res.json(deliveries))
        .catch(next);
}

function getById(req, res, next) {
    deliveryService.getById(req.params.id)
        .then(delivery => res.json(delivery))
        .catch(next);
}

function getLogged(req, res, next) {
    res.json(req.delivery);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        nationalId: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        phoneNumber: Joi.string().empty(''),
        status: Joi.string().empty(''),
        image: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    deliveryService.update(req.params.id, req.body)
        .then(delivery => res.json(delivery))
        .catch(next);
}

function _delete(req, res, next) {
    deliveryService.delete(req.params.id)
        .then(() => res.json({ message: 'Orden eliminada con éxito' }))
        .catch(next);
}