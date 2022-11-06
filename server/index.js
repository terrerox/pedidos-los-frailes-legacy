require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const expressOasGenerator = require('express-oas-generator');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// api routes
app.use('/api/accounts', require('./accounts/accounts.controller'));
app.use('/api/locals', require('./locals/locals.controller'));
app.use('/api/products', require('./products/products.controller'));
app.use('/api/orders', require('./orders/orders.controller'));
app.use('/api/deliveries', require('./deliveries/deliveries.controller'));
app.use('/api/subscriptions', require('./subscriptions/subscriptions.controller'));

expressOasGenerator.init(app, {});
// global error handler
app.use(errorHandler);

// start server
const host = process.env.HOST || '0.0.0.0'
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
app.listen(port, host, () => console.log('Server listening on port ' + port + ' and host '+ host));