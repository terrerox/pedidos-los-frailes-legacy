const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require('dotenv').config()


module.exports = db = {};

initialize();

async function initialize() {
  const connectionData = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  }
  const {
    host,
    port,
    user,
    password,
    database,
  } = connectionData
  console.log({
    host,
    port,
    user,
    password,
    database,
  })
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  });
  
  console.log(connection)
  //await connection.query(`CREATE DATABASE IF NOT EXISTS \`${connectionData.database}\`;`);

  const sequelize = new Sequelize(connectionData.database, connectionData.user, connectionData.password, {
    dialect: "mysql",
  });

  db.Local = require("../locals/local.model")(sequelize);
  db.Product = require("../products/product.model")(sequelize);
  db.Order = require("../orders/order.model")(sequelize);
  db.Delivery = require("../deliveries/delivery.model")(sequelize);
  db.Account = require("../accounts/account.model")(sequelize);
  db.Subscription = require("../subscriptions/subscription.model")(sequelize);

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

  db.Account.hasOne(db.Order);
  db.Order.belongsTo(db.Account);

  db.Account.hasOne(db.Subscription, { foreignKey: 'accountId' });
  db.Subscription.belongsTo(db.Account, { foreignKey: 'accountId' });


  // sync all models with database
  await sequelize.sync();
}
