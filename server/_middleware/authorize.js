const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize() {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const restaurant = await db.Restaurant.findByPk(req.user.sub);

            // check restaurant still exists
            if (!restaurant)
                return res.status(401).json({ message: 'Unauthorized' });

            // authorization successful
            req.restaurant = restaurant.get();
            next();
        }
    ];
}