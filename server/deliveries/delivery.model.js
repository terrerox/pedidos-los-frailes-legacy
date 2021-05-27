const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    accountId: { type: DataTypes.INTEGER, primaryKey: true },
    nationalId: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    cloudinaryId: { type: DataTypes.STRING, allowNull: false },
  }; 

  const Delivery = sequelize.define("Delivery", attributes);
  
  return Delivery;
};
