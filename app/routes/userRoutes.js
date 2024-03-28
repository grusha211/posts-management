const express = require("express");
const {loginValidation,signupValidataion,verifyEmailValidation} = require("../validations/authValidations")


const {authController} = require("../controllers");

const userRoutes = () => {
  const userRoutes = express.Router();
  userRoutes.post("/login",loginValidation,authController.login);
  userRoutes.post("/signup",signupValidataion,authController.signup);
  userRoutes.post("/verifyemail",verifyEmailValidation,authController.verifyEmail);
  return userRoutes;
};

module.exports = userRoutes;
