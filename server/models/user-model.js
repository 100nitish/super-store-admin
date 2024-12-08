const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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

// Define the model
const User = mongoose.model("User", userSchema);
module.exports = User;
