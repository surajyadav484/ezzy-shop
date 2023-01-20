const express = require("express");
const router = express.Router();
const wishlistContoller = require("../controller/wishlistController");

router.post("/addToWishList", wishlistContoller.addToWishList);
router.get("/getWishList/:userId", wishlistContoller.getWishList);

module.exports = router;
