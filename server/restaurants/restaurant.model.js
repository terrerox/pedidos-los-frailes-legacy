const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    title: { type: DataTypes.STRING, allowNull: false },
    cat1: { type: DataTypes.STRING, allowNull: false },
    cat2: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.BLOB, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  const Restaurant = sequelize.define("Restaurant", attributes, options);

  return Restaurant;
};
