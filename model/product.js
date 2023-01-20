const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const { INTEGER, STRING, DOUBLE } = DataTypes;

const Product = sequelize.define("product", {
  productId: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productName: { type: STRING, allowNull: false },
  productPrice: { type: DOUBLE, allowNull: false },
  totalQuantity: { type: INTEGER, allowNull: false },
});

module.exports = Product;
