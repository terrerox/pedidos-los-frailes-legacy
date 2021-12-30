const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    endpoint: { type: DataTypes.TEXT, allowNull: false },
    expirationTime: { type: DataTypes.TIME, allowNull: true },
    p256dh: { type: DataTypes.STRING, allowNull: false },
    auth: { type: DataTypes.STRING, allowNull: false },
  };

  const Subscription = sequelize.define("Subscription", attributes, {
    timestamps: false
  });
  
  return Subscription;
};
