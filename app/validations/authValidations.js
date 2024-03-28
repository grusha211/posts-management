const { body, validationResult } = require("express-validator");

const signupValidataion = [
  body("email", "email Required!")
    .notEmpty()
    .isEmail()
    .withMessage("email must be in proper format!"),
  body("password", "password Required!")
    .notEmpty()
    .isStrongPassword({
      minLength: 10,
      maxLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "password must be 10 characters long and have atleast one uppercase, lowercase and special character!"
    ),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
    } else {
      console.log(errors);
      return res.status(400).send({
        error: errors.errors[0].msg,
      });
    }
  },
];

const loginValidation = [
  body("email", "email Required!")
    .notEmpty()
    .isEmail()
    .withMessage("email must be in proper format!"),
  body("password")
    .notEmpty()
    .isStrongPassword({
      minLength: 10,
      maxLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "password must be 10characters long and have atleast one uppercase, lowercase and special character!"
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      res.status(422).json({
        errors: errors.errors[0].msg,
      });
    }
  },
];

const verifyEmailValidation = [
  body("email", "email Required!")
    .notEmpty()
    .isEmail()
    .withMessage("email must be in proper format!"),
  body("otp", "otp Required!")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("code must be 6 digit long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      res.status(422).json({
        errors: errors.errors[0].msg,
      });
    }
  },
];

module.exports = {
  signupValidataion,
  loginValidation,
  verifyEmailValidation,
};
