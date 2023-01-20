const express = require("express");
const router = express.Router();
const userAuthController = require("../controller/auth-controller/userAuthController");
const { validateUser } = require("../util/validateUser");
//POST: http://localhost:5000/auth/registerUser
router.post("/registerUser", validateUser(), userAuthController.registerUser);

//POST: http://localhost:5000/auth/login
router.post("/login", userAuthController.loginUser);

module.exports = router;
