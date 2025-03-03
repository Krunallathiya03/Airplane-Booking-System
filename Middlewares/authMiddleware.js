const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token required" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
      // console.log(decoded);

      if (err) {
        return res.status(401).json({ Message: "Unauthorised: Invalid token" });
      }
      if (!decoded || !decoded.id) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid token payload" });
      }
      //console.log(token);

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in Verify token.....", error });
  }
};

// Role-based Access control

const admin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") next();
    else {
      res.status(403).json({ Message: "Admin Acess Required..." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Error in Access control.....", error });
  }
};

module.exports = { verifyToken, admin };
