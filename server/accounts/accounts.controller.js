const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const authorize = require('_middleware/authorize')
const accountService = require('./account.service');

// routes
router.post('/join', joinSchema, join);
router.get('/all', getAll);
router.get('/logged', authorize(), getLogged);
router.get('/:id', getById);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function joinSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        role: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function join(req, res, next) {
    accountService.join(req.body)
        .then(token => res.json(token))
        .catch(next);
}

function getLogged(req, res, next) {
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

function _delete(req, res, next) {
    accountService.delete(req.params.id)
        .then(() => res.json({ message: 'Orden eliminada con éxito' }))
        .catch(next);
}