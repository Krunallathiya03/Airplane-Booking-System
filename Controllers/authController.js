const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const { sendOtp } = require("../Utils/emailServices");

// ----------------------------------------Register--------------------------------------

const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields..." });
    }

    //check user
    const existuser = await userModel.findOne({ email });
    if (existuser)
      return res.status(400).json({ message: "You are already register..." });

    //hash password
    const hash = await bcrypt.hash(password, 10);

    //create user
    const user = await userModel.create({
      name,
      email,
      password: hash,
      role,
    });
    await user.save();
    res.status(200).json({ message: "user registerd sucessfully....", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in register Api....", error });
  }
};

// --------------------------------------------Login-----------------------------------------
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    //compare password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Your password is not matched" });
    }

    //generate otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    if (user?.role === "admin") {
      await sendOtp(user.email, otp);
    }

    //token
    let token;
    if (user?.role === "user") {
      token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.TOKEN
      );
    }
    //console.log(user);

    res.status(200).send({ message: "login sucessfully....", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in login Api....", error });
  }
};

// --------------------------------------------verify admin otp----------------------------------
const verifyAdminOtp = async (req, res) => {
  try {
    const { adminId, otp } = req.body;
    const user = await userModel.findById(adminId);

    if (!user || user.role != "admin") {
      return res.status(404).send({ message: "Admin access only..." });
    }

    // check if otp is valid
    if (user.otp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ Message: " Invalid or expired otp" });
    }

    //generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN
    );

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res
      .status(200)
      .json({ message: "Admin Login sucessfully...", token, user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in verify Admin Otp API....", error });
  }
};

module.exports = { registerController, loginController, verifyAdminOtp };
