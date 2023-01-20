const express = require("express");
const router = express.Router();
const addressContoller = require("../controller/addressContoller");

router.post("/addAddress", addressContoller.addAddress);

module.exports = router;
