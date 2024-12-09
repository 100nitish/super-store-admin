const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "suspended"],
    },
});


userSchema.pre("save", async function (next) {
    const user = this;

    
    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error); 
    }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
