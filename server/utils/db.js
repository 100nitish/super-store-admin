const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI; // Ensure this environment variable is correctly set

const connectDb = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(URI);
    console.log("Connection Successful");
  } catch (error) {
    console.error("You are not connected:", error.message); 
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDb;
