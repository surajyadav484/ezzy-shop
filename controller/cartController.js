const { Op } = require("sequelize");
const Product = require("../model/product");
const User = require("../model/user");

//add to cart
exports.addToCart = async (req, res) => {
  try {
    let { wishlistFlag } = req.query;

    const { userId } = req.body;
    const currentUser = await User.findByPk(userId);
    const cart = await currentUser.getCart();

    console.log({ cart });
    if (wishlistFlag === "false") {
      const { productId } = req.query;
      if (!productId) throw new Error("Product id does not exist..");
      const foundProduct = await Product.findByPk(parseInt(productId));
      if (!foundProduct) throw new Error("Product with id not found");

      if (!cart) {
        const createdCart = await currentUser.createCart();
        const newCart = await createdCart.addProduct(foundProduct, {
          through: { quantity: 1 },
        });
        return res.status(200).json({ newCart });
      } else {
        // fetch the cart and add the new part to cart
        let productAlreadyAdded = await cart.getProducts({
          where: { productId },
        });
        if (productAlreadyAdded.length === 0) {
          const newCart = await cart.addProduct(foundProduct, {
            through: { quantity: 1 },
          });
          return res.status(200).json({ newCart });
        } else {
          const product = productAlreadyAdded[0];
          let newQuantity = product.cartProduct.quantity + 1;
          const updatedProduct = await cart.addProduct(product, {
            through: { quantity: newQuantity },
          });
          console.log(updatedProduct);

          return res.status(200).json({ updatedProduct });
        }
      }
    }

    //adding the wishlist items to cart items
    console.log("wishlistflag true");
    const wishlist = await currentUser.getWishlist();
    let productsInWishlist = await wishlist?.getProducts();

    if (!cart) {
      const createdCart = await currentUser.createCart();
      const newCart = await createdCart.addProducts(
        productsInWishlist.map((product) => {
          return (product.cartProduct = {
            quantity: product.wishListProduct.quantity,
          });
        })
      );
      return res.status(200).json({ newCart });
    }

    if (productsInWishlist.length > 0) {
      const productsInCart = await cart.getProducts();
      const productIds = productsInCart.map((product) => product.productId);
      if (productsInCart.length > 0) {
        // const newCartItems = productsInCart.map((product) => {
        //   if (productIds.includes(product.productId)) {
        //     product.cartProduct = {
        //       quantity: product.cartProduct.quantity + 1,
        //     };
        //     return product;
        //   } else {
        //     return product;
        //   }
        // });

        const newItems = productsInWishlist?.map((product) => {
          if (productIds.includes(product.productId)) {
            console.log("productId in wishlist", product.productId);
            let newQuantity = productsInCart.find(
              (prodInCart) => prodInCart.productId === product.productId
            ).cartProduct.quantity;

            product.cartProduct = {
              quantity: newQuantity + 1,
            };
          }
          console.log({ product });
          return product;
        });
        const addedCartItem = await cart.addProducts(newItems);
        if (addedCartItem.length > 0) {
          await wishlist.setProducts(null);
        }
        return res.status(200).json({ addedCartItem });
      }
    }

    return res.status(200).json({ productsInWishlist });
  } catch (error) {
    return res.json({ err: error.message });
  }
};

//Get Cart
exports.getProductsInCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findByPk(userId);
    if (!currentUser) throw new Error("User not found");

    const userCart = await currentUser.getCart();
    if (!userCart) throw new Error("User does not have any existing cart");

    const productsInCart = await userCart.getProducts();
    console.log(productsInCart[0].cartProduct.quantity);
    return res.status(200).json({ productsInCart });
  } catch (error) {
    return res.json({ err: error.message });
  }
};

//Remove item from Cart
exports.removeProductsFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.query;
    const currentUser = await User.findByPk(parseInt(userId));
    if (!currentUser) throw new Error("User not found. Please login again..");
    const userCart = await currentUser.getCart();
    const removedProduct = await userCart.removeProduct(productId);

    return res.status(200).json({ removedProduct });
  } catch (error) {
    return res.json({ err: error.message });
  }
};

//Modify Cart
exports.modifyCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const currentUser = await User.findByPk(parseInt(userId));
    if (!currentUser) throw new Error("User not found. Please login again..");
    const userCart = await currentUser.getCart();
    const fetchedProduct = await userCart.getProducts({ where: { productId } });
    // if (fetchedProduct.length > 0) {
    //   let product = fetchedProduct[0];

    // }
    const updatedProduct = await userCart.addProduct(fetchedProduct[0], {
      through: { quantity },
    });
    return res.status(200).json({ updatedProduct });
  } catch (error) {
    res.json({ err: error.message });
  }
};
