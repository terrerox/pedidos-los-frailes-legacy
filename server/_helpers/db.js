const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require('dotenv').config()


module.exports = db = {};

initialize();

async function initialize() {
  const connectionData = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'terrerox',
    password: process.env.DB_PASS || 'wendy0611',
    database: process.env.DB_NAME || 'pedidoslosfrailes',
  }
  const connection = await mysql.createConnection({
    host: connectionData.host,
    port: connectionData.port,
    user: connectionData.user,
    password: connectionData.password,
    database: connectionData.database,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${connectionData.database}\`;`);

  const sequelize = new Sequelize(connectionData.database, connectionData.user, connectionData.password, {
    dialect: "mysql",
  });

  db.Local = require("../locals/local.model")(sequelize);
  db.Product = require("../products/product.model")(sequelize);
  db.Order = require("../orders/order.model")(sequelize);
  db.Delivery = require("../deliveries/delivery.model")(sequelize);
  db.Account = require("../accounts/account.model")(sequelize);

  db.Account.hasOne(db.Delivery, { foreignKey: 'accountId' });
  db.Delivery.belongsTo(db.Account, { foreignKey: 'accountId' });

  db.Account.hasOne(db.Local, { foreignKey: 'accountId' });
  db.Local.belongsTo(db.Account, { foreignKey: 'accountId' });

  db.Local.hasMany(db.Product);
  db.Product.belongsTo(db.Local);

  db.Local.hasMany(db.Order);
  db.Order.belongsTo(db.Local);

  db.Delivery.hasOne(db.Order);
  db.Order.belongsTo(db.Delivery);

  // sync all models with database
  await sequelize.sync();
}
