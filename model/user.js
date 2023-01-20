const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("user", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: DataTypes.TEXT,
});

module.exports = User;
