require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleWare = require("./middleware/error-middleware");

app.use(express.json());
app.use("/api/auth", router);
app.use(errorMiddleWare)
const PORT = 5000;

(async () => {
  try {
    await connectDb(); 
    app.listen(PORT, () => {
      console.log(`Server is Running at Port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database or start server:", error);
    process.exit(1); 
  }
})();
