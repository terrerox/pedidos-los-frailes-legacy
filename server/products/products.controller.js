const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const productService = require('./product.service');

// routes
router.post('/create', authorize(), createSchema, create);
router.get('/', getAll);
router.get('/current', authorize(), getLocalProduct);
router.get('/:id', getById);
router.get('/img/:id', getImage);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
        rating: Joi.string(),
        image: Joi.string().required(),
        prepTimeValue: Joi.string().required(),
        prepTimeUnit: Joi.string().required(),
        price: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    // set localid to body
    req.body.LocalAccountId = req.local.id
    productService.create(req.body)
        .then(product => res.json(product))
        .catch(next);
}

function getAll(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(next);
}

function getLocalProduct(req, res, next) {
    const currentLocalId = req.local.id
    productService.getLocalProduct(currentLocalId)
        .then(products => res.json(products))
        .catch(next);
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => res.json(product))
        .catch(next);
}

function getImage(req, res, next) {
    const id = req.params.id;
    productService.getImage(id)
        .then(image => res.end(image))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        category: Joi.string().empty(''),
        rating: Joi.string(),
        image: Joi.string().empty(''),
        prepTimeValue: Joi.string().empty(''),
        prepTimeUnit: Joi.string().empty(''),
        price: Joi.number().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    req.body.LocalId = req.local.id
    productService.update(req.params.id, req.body)
        .then(product => res.json(product))
        .catch(next);
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({ message: 'Producto eliminado con éxito' }))
        .catch(next);
}