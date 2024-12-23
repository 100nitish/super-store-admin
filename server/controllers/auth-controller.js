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
        res.status(200).send("Welcome to Register Page");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid Email or Password" });
        }

        // const isMatch = await bcrypt.compare(password, user.password); 
        // if (!isMatch) {
        //     return res.status(401).json({ msg: "Invalid Email or Password" });
        // }

        const token = await user.generateToken(); 

        return res.status(200).json({ 
            msg: "Login Successful", 
            token, 
            userId: user._id.toString(),
            user: { 
                username: user.username, 
                email: user.email, 
                userType: user.userType 
            }
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ msg: "Server Error" });
    }
};






module.exports = { home, register, getRegister, login };
