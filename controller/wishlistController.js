const Product = require("../model/product");
const User = require("../model/user");
const WishList = require("../model/wishlist");
const WishListProduct = require("../model/wishlistProduct");

//Get WishList
exports.getWishList = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new Error("User not found");
    }
    const foundWishList = await WishList.findAll({ where: { userId } });
    if (!foundWishList) {
      return res.status(400).json("WishList does not exist");
    }
    return res.status(200).json({ foundWishList });
  } catch (error) {
    return res.json({ err: error.message });
  }
};

//addToWishList
exports.addToWishList = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    let foundProduct = await Product.findByPk(productId);
    if (!foundProduct)
      throw new Error("product with entered productId not found..");

    const user = await User.findOne({ where: { userId } });
    if (!user) {
      throw new Error("user not found");
    }

    const wishlist = await user.getWishlist();
    // console.log({ wishlist });
    if (!wishlist) {
      //wishlist does not exist. Create new wishlist
      const newWishlist = await user.createWishlist();

      //if product is not available then add it to the list
      const addedWishList = await newWishlist.addProduct(foundProduct, {
        through: { quantity: 1 },
      });

      return res.status(200).json({ addedWishList });
    }
    //product found.....

    const fetchedProduct = await wishlist.getProducts({
      where: { productId },
    });
    if (fetchedProduct.length === 0) {
      const addedWishList = await wishlist.addProduct(foundProduct, {
        through: { quantity: 1 },
      });
      return res.status(200).json({ addedWishList });
    }

    let newQuantity = fetchedProduct[0]?.wishlistProduct?.quantity + 1;
    console.log(newQuantity);
    const addedWishList = await wishlist.addProduct(fetchedProduct[0], {
      through: { quantity: newQuantity },
    });

    // const product = fetchedProduct[0];

    // console.log(product?.wishListProduct);
    return res.status(200).json({ addedWishList });
  } catch (error) {
    return res.status(401).json({ err: error.message });
  }
};
