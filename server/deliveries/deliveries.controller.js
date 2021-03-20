const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const deliveryService = require('./delivery.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/all', getAll);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    deliveryService.authenticate(req.body)
        .then(delivery => res.json(delivery))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        status: Joi.string().required(),
        image: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    req.body.imageUrl = `${req.protocol}://${req.headers.host}/deliveries/img/`
    deliveryService.create(req.body)
        .then(() => res.json({ message: 'Delivery registrado con éxito' }))
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

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        phoneNumber: Joi.string().empty(''),
        status: Joi.string().empty(''),
        image: Joi.string().empty(''),
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
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