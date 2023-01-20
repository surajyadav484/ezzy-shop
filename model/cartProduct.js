const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const { INTEGER } = DataTypes;

const CartProduct = sequelize.define("cartProduct", {
  cartId: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: INTEGER,
});

module.exports = CartProduct;
