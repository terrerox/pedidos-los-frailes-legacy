const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    numberOfHouse: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    reference: { type: DataTypes.STRING, allowNull: false },
    apartment: { type: DataTypes.STRING, allowNull: true },
    additionalNotes: { type: DataTypes.TEXT, allowNull: true },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    cartItems: { type: DataTypes.TEXT, allowNull: false }
  };

  const Order = sequelize.define("Order", attributes);
  
  return Order;
};
