const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize(roles = []) {

    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const account = await db.Account.findByPk(req.user.sub);

            if (!account || (roles.length && !roles.includes(account.role))) {
                // account no longer exists or role not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            if (account.role === 'Local') {
                const account = await db.Account.findByPk(req.user.sub, { include: [db.Local] });
                req.local = account.get();
            } else if (account.role === 'Delivery') {
                const account = await db.Account.findByPk(req.user.sub, { include: [db.Delivery] });
                req.delivery = account.get();
            } else {
                req.user = account
            }
            next();
        }
    ];
}