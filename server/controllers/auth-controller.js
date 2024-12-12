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
        console.log(req.body);
        const { username, email, password, status } = req.body;

        if (!username || !email || !password || !status) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password before saving
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        const newUser = await User.create({ username, email, password: hash_password, status });

       

        res.status(201).json({ 
            msg: "Registration Successful", 
            token: await newUser.generateToken(), 
            userId: newUser._id.toString() 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
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

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json({ msg: "Invalid Email or Password" });
        }

        const user = await userExist.comparePassword(password);
        if (!user) {
            return res.status(401).json({ msg: "Invalid Email or Password" });
        }

        res.status(200).json({ 
            msg: "Login Successful", 
            token: await userExist.generateToken(), 
            userId: userExist._id.toString() 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

module.exports = { home, register, getRegister, login };
