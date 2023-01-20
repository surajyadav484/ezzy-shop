const sequelize = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const {
  handleLogout,
} = require("./controller/auth-controller/logoutController");

const authRoutes = require("./routes/authRoutes");
const refreshToken = require("./controller/auth-controller/refreshContoller");
const verifyJWT = require("./middleware/verifyJWT");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const User = require("./model/user");
const WishList = require("./model/wishlist");
const Product = require("./model/product");
const WishListProduct = require("./model/wishlistProduct");
const Address = require("./model/address");
const addressRoutes = require("./routes/addressRoutes");
const Cart = require("./model/cart");
const CartProduct = require("./model/cartProduct");
const cartRoutes = require("./routes/cartRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use("/auth", authRoutes);
// app.use("/refresh", refreshToken.handleRefreshToken);
//app.use(refreshToken.handleRefreshToken);

// app.use(verifyJWT);

app.use("/product", productRoutes);
app.use("/wish", wishlistRoutes);
app.use("/cart", cartRoutes);
app.use(addressRoutes);
app.get("/logout", handleLogout);

WishList.hasOne(User);
User.belongsTo(WishList);

User.hasMany(Address);
Address.belongsTo(User);

WishList.belongsToMany(Product, { through: WishListProduct });
Product.belongsToMany(WishList, { through: WishListProduct });

User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartProduct });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(process.env.SERVER_PORT || 5000);
    console.log(`server started listening at ${process.env.SERVER_PORT}`);
  })
  .catch((err) => console.log(err));
