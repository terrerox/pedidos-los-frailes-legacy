const webpush = require('web-push');
require('dotenv').config()

webpush.setVapidDetails(
    'mailto:pedidoslosfrailes@gmail.com',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
);

module.exports = webpush;