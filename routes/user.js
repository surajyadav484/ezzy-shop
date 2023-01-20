const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { validateUser } = require("../util/validateUser");
const verifyJWT = require("../middleware/verifyJWT");
const { verifyRefreshToken } = require("../middleware/verifyRefreshToken");

module.exports = router;
