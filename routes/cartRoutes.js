const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

//Add to Cart
router.post("/addToCart", cartController.addToCart);

//Get Cart
router.get("/getCart/:userId", cartController.getProductsInCart);

//Remove item from Cart
router.delete("/removeItem", cartController.removeProductsFromCart);

//Update item in Cart
router.put("/modifyCart", cartController.modifyCart);

module.exports = router;
