const express = require("express");
const {
  getAllUserController,
  getUserByIdController,
  updateUserController,
  updatePasswordController,
  deleteUserController,
} = require("../Controllers/userController");

const route = express.Router();

//get all user
route.get("/get", getAllUserController);

//get user by id
route.get("/get/:id", getUserByIdController);

//update user
route.put("/:id", updateUserController);

//update password
route.post("/update/:id", updatePasswordController);

//delete user
route.delete("/delete/:id", deleteUserController);

module.exports = route;
