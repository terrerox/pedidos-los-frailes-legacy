const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const productService = require('./product.service');

// routes
router.post('/create', authorize(), createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        cat1: Joi.string().required(),
        cat2: Joi.string().required(),
        rating: Joi.string().required(),
        image: Joi.binary().required(),
        prepTimeValue: Joi.string().required(),
        prepTimeUnit: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    // set restaurantid to body
    req.body.RestaurantId = req.restaurant.id
    productService.create(req.body)
        .then(() => res.json({ message: 'Product created' }))
        .catch(next);
}

function getAll(req, res, next) {
    const currentRestaurantId = req.restaurant.id
    productService.getAll(currentRestaurantId)
        .then(products => res.json(products))
        .catch(next);
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => res.json(product))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        cat1: Joi.string().required(),
        cat2: Joi.string().required(),
        rating: Joi.string().required(),
        image: Joi.string().required(),
        prepTimeValue: Joi.string().required(),
        prepTimeUnit: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(product => res.json(product))
        .catch(next);
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({ message: 'product deleted successfully' }))
        .catch(next);
}