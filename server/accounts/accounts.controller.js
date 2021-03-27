const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const authorize = require('_middleware/authorize')
const accountService = require('./account.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/all', getAll);
router.get('/current', authorize(Role.Delivery), getCurrent);
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
    accountService.authenticate(req.body)
        .then(account => res.json(account))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    accountService.create(req.body)
        .then(() => res.json({ message: 'account registrado con éxito' }))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getAll(req, res, next) {
    accountService.getAll()
        .then(deliveries => res.json(deliveries))
        .catch(next);
}

function getById(req, res, next) {
    accountService.getById(req.params.id)
        .then(account => res.json(account))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    accountService.update(req.params.id, req.body)
        .then(account => res.json(account))
        .catch(next);
}

function _delete(req, res, next) {
    accountService.delete(req.params.id)
        .then(() => res.json({ message: 'Orden eliminada con éxito' }))
        .catch(next);
}