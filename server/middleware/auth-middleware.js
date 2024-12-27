const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim(); 
  console.log("Extracted Token:", jwtToken);

  try {
   
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECTECT_KEY);
    console.log("Decoded Token:", isVerified);

   
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0, 
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

   
    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
