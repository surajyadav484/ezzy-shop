const { body } = require("express-validator");

exports.validateUser = () => {
  return [
    body("fullName")
      .matches(/^[a-z ,.'-]+$/i)
      .withMessage("Name must contain only alphabets")
      .isLength({ min: 3, max: 25 })
      .withMessage("Please enter characters between 3-25"),
    body("phone")
      .matches(/^[0-9]{10}$/)

      .withMessage("Phone number should contain 10 digits"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Plese enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Should be min 6 character long"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and Confirm Password must be same");
      }
      return true;
    }),
  ];
};
