const express = require("express");
const { registerController, loginController } = require("../Controllers/authController");


const route = express.Router();

//Register
route.post("/register",registerController);

//login
route.post("/login",loginController)




module.exports = route;