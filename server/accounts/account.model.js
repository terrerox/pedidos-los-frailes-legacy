const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  };

  const Account = sequelize.define("Account", attributes);

  return Account;
};
