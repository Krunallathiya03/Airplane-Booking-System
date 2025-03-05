const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");

// -------------------------------------Get All Users-------------------------------------

const getAllUserController = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json({ TotalUser: user.length, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in Get All User Api....", error });
  }
};

// -------------------------------------------Get User By Id---------------------------------------
const getUserByIdController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById(req.params.id);
    //validation
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
      });
    }

    //response
    res.status(200).send({
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in Get User By Id Api....", error });
  }
};

// --------------------------------------Update User-----------------------------------
const updateUserController = async (req, res) => {
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User Update Sucessfully...", updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in  Updete  User Api....", error });
  }
};

// --------------------------------------Upadate User----------------------------------------

const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ messsage: "User Not found" });

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return res
        .status(400)
        .json({ message: "Please Provide oldPassword or New Password..." });

    //check password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(404).json({ message: "Invalid Password" });

    //hash password
    //const salt = 10
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();

    res.status(200).json({ message: "Password Update Sucessfully...", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in Update User Api....", error });
  }
};

// ------------------------------------------Delete User----------------------------------------

const deleteUserController = async (req, res) => {
  try {
    const deleteUser = await userModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ Message: "User Delete Sucessfully.....", deleteUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in delete User Api....", error });
  }
};

module.exports = {
  getAllUserController,
  getUserByIdController,
  updateUserController,
  updatePasswordController,
  deleteUserController,
};
