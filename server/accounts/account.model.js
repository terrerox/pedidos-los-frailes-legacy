const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
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

  const Account = sequelize.define("Account", attributes, options);

  return Account;
};
