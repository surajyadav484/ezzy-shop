const Product = require("../model/product");

//Create Product
exports.addProduct = async (req, res) => {
  try {
    const { productName, productPrice, totalQuantity } = req.body;
    const newProduct = await Product.create({
      productName,
      productPrice,
      totalQuantity,
    });
    if (!newProduct) {
      throw new Error("error in adding product..");
    }
    return res.status(200).json({ newProduct });
  } catch (error) {
    res.json({ err: error.message });
  }
};

//Get All Products
exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    if (!allProducts) {
      throw new Error("error in fetching products..");
    }
    return res.status(200).json({ allProducts });
  } catch (error) {
    res.json({ err: error.message });
  }
};

//Get Single Products
exports.getById = async (req, res) => {
  try {
    const { productId } = req.query;
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("error in fetching products..");
    }
    return res.status(200).json({ product });
  } catch (error) {
    res.json({ err: error.message });
  }
};
