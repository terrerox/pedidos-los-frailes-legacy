const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.STRING, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.TEXT, allowNull: false },
    prepTimeValue: { type: DataTypes.STRING, allowNull: false },
    prepTimeUnit: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  };

  const Product = sequelize.define("Product", attributes);
  
  return Product;
};
