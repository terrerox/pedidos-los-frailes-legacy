const webpush = require('_helpers/webpush');
const urlsafeBase64 = require('urlsafe-base64');
const db = require('_helpers/db');
const publicKey = process.env.PUBLIC_VAPID_KEY;
require('dotenv').config()

module.exports = {
    getKey,
    addSubscription,
    sendPushToAll,
    sendPushById
};

function getKey() {
    return urlsafeBase64.decode(publicKey);
}

async function addSubscription(subscriptionData) {
    const { keys } = subscriptionData
    await db.Subscription.create({
        accountId: subscriptionData.accountId,
        endpoint: subscriptionData.endpoint,
        expirationTime: subscriptionData.expirationTime,
        p256dh: keys.p256dh,
        auth: keys.auth
    });
}

async function sendPushToAll(body) {
    const subscriptions = await getAll()
    subscriptions.forEach(subscription => {
        const { endpoint, expirationTime, p256dh, auth } = subscription
        const subscriptionData = {
            endpoint,
            expirationTime,
            keys: {
                auth,
                p256dh
            }
        }
        webpush.sendNotification(subscriptionData, JSON.stringify(body))
            .then(res => res)
            .catch( err => {
                
                if ( err.statusCode === 410 ) {
                    _delete(subscription)
                }

            });
    });
}

async function sendPushById(id, data) {
    const subscriptions = await findSubscriptions(id)

    subscriptions.forEach(subscription => {
        const { endpoint, expirationTime, p256dh, auth } = subscription
        const subscriptionData = {
            endpoint,
            expirationTime,
            keys: {
                auth,
                p256dh
            }
        }
        webpush.sendNotification(subscriptionData, JSON.stringify(data))
            .then(res => res)
            .catch( err => {
                
                if ( err.statusCode === 410 ) {
                    _delete(subscription)
                }

            });
    });
}

// helpers

async function getAll() {
    return await db.Subscription.findAll();
}

async function findSubscriptions (id) {
    return await db.Subscription.findAll(
        {
            where: { AccountId: id },
        }
    );
}
async function _delete(subscription) {
    await subscription.destroy();
}
