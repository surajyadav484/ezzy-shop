const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const { INTEGER } = DataTypes;

const WishList = sequelize.define("wishlist", {
  wishlistId: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = WishList;
