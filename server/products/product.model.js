const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    title: { type: DataTypes.STRING, allowNull: false },
    cat1: { type: DataTypes.STRING, allowNull: false },
    cat2: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.BLOB, allowNull: false },
    prepTimeValue: { type: DataTypes.STRING, allowNull: false },
    prepTimeUnit: { type: DataTypes.STRING, allowNull: false },
  };

  const Product = sequelize.define("Product", attributes);
  
  return Product;
};
