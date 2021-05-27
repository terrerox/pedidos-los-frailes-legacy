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
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/locals', require('./locals/locals.controller'));
app.use('/products', require('./products/products.controller'));
app.use('/orders', require('./orders/orders.controller'));
app.use('/deliveries', require('./deliveries/deliveries.controller'));

expressOasGenerator.init(app, {});
// global error handler
app.use(errorHandler);

// start server
const host = process.env.HOST || '0.0.0.0';
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, host, () => console.log('Server listening on port ' + port));