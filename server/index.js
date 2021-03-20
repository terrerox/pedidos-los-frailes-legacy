require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const fileupload = require('express-fileupload')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
// app.use(fileupload());

// api routes
app.use('/restaurants', require('./restaurants/restaurants.controller'));
app.use('/products', require('./products/products.controller'));
app.use('/orders', require('./orders/orders.controller'));
app.use('/deliveries', require('./deliveries/deliveries.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));