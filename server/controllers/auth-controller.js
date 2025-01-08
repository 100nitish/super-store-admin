const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to Backend");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
const register = async (req, res) => {
    try {
        const { username, email, password, status, userType } = req.body;

        if (!username || !email || !password || !status || !userType) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); 

        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            status, 
            userType 
        });

        await newUser.save();

        const token = await newUser.generateToken(); 

        return res.status(201).json({ 
            msg: "Registration Successful", 
            token, 
            userId: newUser._id.toString(),
            user: { 
                username: newUser.username, 
                email: newUser.email, 
                status: newUser.status, 
                userType: newUser.userType 
            }
        });
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({ msg: "Server Error" });
    }
};








const getRegister = async (req, res) => {
    try {
        const users = await User.find({ userType: "User" }); 

        if (!users.length) {
            return res.status(404).json({ msg: "No users found with userType 'User'" });
        }

        return res.status(200).json({
            msg: "Users fetched successfully",
            users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const deleteRegister = async (req, res) => {
    try {
        const { id } = req.params; 

       
        const deleteUser = await User.findByIdAndDelete(id);

      
        if (!deleteUser) {
            return res.status(404).json({ error: "User not found" });
        }

       
        return res.status(200).json({
            msg: "User deleted successfully",
            deletedUser: deleteUser,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};






const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    console.log("Looking for user with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid Email or Password" });
    }
    console.log("User found:", user);

    
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ msg: "Invalid Email or Password" });
    // }

    
    console.log("Generating token for user:", user._id);
    const token = await user.generateToken();
    console.log("Generated token:", token);

    return res.status(200).json({
      msg: "Login Successful",
      token,
      userId: user._id.toString(),
      user: {
        username: user.username,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error("Error during login:", err.stack || err);
    return res.status(500).json({ msg: "Server Error" });
  }
};






module.exports = { home, register, getRegister, login, deleteRegister };
