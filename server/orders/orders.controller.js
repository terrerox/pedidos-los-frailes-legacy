const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const orderService = require('./order.service');
const subscriptionService = require('../subscriptions/subscription.service');

// routes
router.post('/create', authorize(), createSchema, create);
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
        apartment: Joi.string().empty(''),
        additionalNotes: Joi.string().empty(''),
        paymentMethod: Joi.string().required(),
        cartItems: Joi.string().required(),
        LocalAccountId: Joi.number().required(),
        DeliveryAccountId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    req.body.AccountId = req.user.dataValues.id
    orderService.create(req.body)
        .then(res => {
            const { LocalAccountId, DeliveryAccountId } = res.dataValues
            Promise.all([
                subscriptionService.sendPushById(LocalAccountId,{
                    title: '¡Tienes una nueva orden!',
                    openUrl:`/local/${LocalAccountId}/orders`,
                    body: 'Ha llegado una nueva orden, revisa ordenes para mas información',
                }),
                subscriptionService.sendPushById(DeliveryAccountId,{
                    title: '¡Tienes una nueva orden!',
                    openUrl:`/delivery/${DeliveryAccountId}/orders`,
                    body: 'Ha llegado una nueva orden, revisa ordenes para mas información',
                })
            ])
            return res.json({ message: 'Orden creada con éxito' })
        })
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
        .then(async(order) => { 
            const { LocalAccountId, status } = order
            
            status === 'confirmed'
                && (
                    await subscriptionService.sendPushById(LocalAccountId,{
                        title: '¡El delivery confirmó la orden!',
                        openUrl:`/local/${LocalAccountId}/orders`,
                        body: 'Revisa ordenes para mas información',
                    })
                )
            return res.json(order)
        })
        .catch(next);
}

function _delete(req, res, next) {
    orderService.delete(req.params.id)
        .then(() => { 
            res.json({ message: 'Orden eliminada con éxito' }) 
        })
        .catch(next);
}
