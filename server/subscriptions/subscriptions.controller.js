const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const subscriptionService = require('./subscription.service');

router.get('/key', authorize(), getPublicKey);
router.post('/subscribe', authorize(), addSubscription);

module.exports = router;

function getPublicKey(req, res, next) {
    const key = subscriptionService.getKey();

    res.send(key);
}

function addSubscription(req, res, next) {
    req.body.accountId = req.user.dataValues.id
    subscriptionService.addSubscription(req.body)
        .then(() => {
            return res.json({ message: 'Subscripción completada' })
        })
        .catch(next);
}