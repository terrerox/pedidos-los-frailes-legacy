const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require('dotenv').config()


module.exports = db = {};

initialize();

async function initialize() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);

  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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
