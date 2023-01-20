const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const { INTEGER, STRING, UUID } = DataTypes;

const Address = sequelize.define("address", {
  addressId: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  addressLine1: {
    type: STRING,
    allowNull: false,
  },
  addressLine2: STRING,
  city: {
    type: STRING,
    allowNull: false,
  },
  state: {
    type: STRING,
    allowNull: false,
  },
  zipcode: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Address;
