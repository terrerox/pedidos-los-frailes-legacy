const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const restaurantService = require('./restaurant.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
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
    restaurantService.authenticate(req.body)
        .then(restaurant => res.json(restaurant))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        cat1: Joi.string().required(),
        cat2: Joi.string().required(),
        rating: Joi.string().required(),
        image: Joi.binary().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    restaurantService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    restaurantService.getAll()
        .then(restaurants => res.json(restaurants))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.restaurant);
}

function getById(req, res, next) {
    restaurantService.getById(req.params.id)
        .then(restaurant => res.json(restaurant))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        cat1: Joi.string().empty(''),
        cat2: Joi.string().empty(''),
        rating: Joi.string().empty(''),
        image: Joi.string().empty(''),
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    restaurantService.update(req.params.id, req.body)
        .then(restaurant => res.json(restaurant))
        .catch(next);
}

function _delete(req, res, next) {
    restaurantService.delete(req.params.id)
        .then(() => res.json({ message: 'restaurant deleted successfully' }))
        .catch(next);
}