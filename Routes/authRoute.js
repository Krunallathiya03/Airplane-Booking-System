const express = require("express");
const {
  registerController,
  loginController,
  verifyAdminOtp,
} = require("../Controllers/authController");

const route = express.Router();

//Register
route.post("/register", registerController);

//login
route.post("/login", loginController);

//verify otp
route.post("/verifyotp",verifyAdminOtp);


module.exports = route;
