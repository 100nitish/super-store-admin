const User = require("../models/user-model");
const bcrypt=require("bcryptjs")

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

      
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

 
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const saltRound = 10;
        const hash_password = await bcrypt.hash(password,saltRound);

        const newUser = await User.create({ username, email, password:hash_password, status });

        res.status(201).json({ msg: "User registered successfully", user: newUser });
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



// const addProduct = async (req,res) =>{


// }

module.exports = { home, register,getRegister };
