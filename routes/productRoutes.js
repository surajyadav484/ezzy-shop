const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

//Add Product
router.post("/addProduct", productController.addProduct);

//Get By Id
router.get("/", productController.getById);

//Get All Products
router.get("/getAllProducts", productController.getAllProducts);

module.exports = router;
