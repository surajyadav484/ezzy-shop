const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const { INTEGER } = DataTypes;

const Cart = sequelize.define("cart", {
  cartId: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Cart;
