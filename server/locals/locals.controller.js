const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const localService = require('./local.service');

// routes
router.post('/create', authorize(Role.Local), createSchema, create);
router.get('/', getAll);
router.get('/current', authorize(Role.Local), getCurrent);
router.get('/:id', getById);
router.put('/', authorize(Role.Local), updateSchema, update);
router.delete('/:id', authorize(Role.Local), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        accountId: Joi.number().required(),
        title: Joi.string().required(),
        category: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    req.body.imageUrl = `${req.protocol}://${req.headers.host}/locals/img/`
    localService.create(req.body)
        .then(() => res.json({ message: 'Registrado con éxito' }))
        .catch(next);
}

function getAll(req, res, next) {
    localService.getAll()
        .then(locals => res.json(locals))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.local);
}

function getById(req, res, next) {
    localService.getById(req.params.id)
        .then(local => res.json(local))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        category: Joi.string().empty(''),
        address: Joi.string().empty(''),
        phoneNumber: Joi.string().empty(''),
        rating: Joi.string().empty(''),
        description: Joi.string().empty(''),
        image: Joi.string().empty(''),
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    localService.update(req.local.id, req.body)
        .then(local => res.json(local))
        .catch(next);
}

function _delete(req, res, next) {
    localService.delete(req.params.id)
        .then(() => res.json({ message: 'Locale eliminado con éxito' }))
        .catch(next);
}