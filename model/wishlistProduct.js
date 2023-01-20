const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const { INTEGER } = DataTypes;

const WishListProduct = sequelize.define("wishlistProduct", {
  wishlistId: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: INTEGER,
});

module.exports = WishListProduct;
