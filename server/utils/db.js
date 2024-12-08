const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI; 

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Successful");
  } catch (error) {
    console.error("You are not connected:", error.message); 
    process.exit(1); 
  }
};

module.exports = connectDb;
