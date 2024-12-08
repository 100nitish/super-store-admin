const User = require("../models/user-model");

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

        
        const newUser = await User.create({ username, email, password, status });

        res.status(201).json({ msg: "User registered successfully", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

module.exports = { home, register };
