const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    tel: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    number: { type: DataTypes.STRING, allowNull: false },
    reference: { type: DataTypes.STRING, allowNull: false },
    apartment: { type: DataTypes.STRING, allowNull: false },
    additionalNotes: { type: DataTypes.STRING, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    cartItems: { type: DataTypes.STRING, allowNull: false },
    RestaurantId: { type: DataTypes.INTEGER, allowNull: false },
  };

  const Order = sequelize.define("Order", attributes);
  
  return Order;
};
