const express = require("express");
const User = require("../../model/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User Registration
exports.registerUser = async (req, res) => {
  try {
    const { fullName, phone, email, password, confirmPassword } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()[0]);
      return res.status(400).json({ err: errors.array()[0].msg });
    } else {
      const existingUser = await User.findOne({ where: { phone } });
      if (existingUser) {
        throw new Error("Mobile Number has already been registered!");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      if (hashedPassword) {
        const user = await User.create({
          fullName,
          phone,
          email,
          password: hashedPassword,
        });
        if (user) {
          return res.status(200).json({ user });
        }
      }
    }
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

//User login

exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    //console.log(password);
    const user = await User.findOne({ where: { phone } });
    // console.log("loggedin user", user);
    if (!user) {
      throw new Error("User not found. Please enter valid credentails!");
    }

    const isLoggedIn = await bcrypt.compare(password, user.password);

    if (isLoggedIn) {
      const accessToken = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30s",
      });
      const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_KEY, {
        expiresIn: "1d",
      });

      user.refreshToken = refreshToken;
      const updatedUser = await user.save();
      //console.log(updatedUser);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        samesite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      throw new Error("User not found. Please enter valid credentails!");
    }
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};
