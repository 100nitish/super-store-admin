require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const authRoute = require("./router/auth-router");
const addProductRoute = require("./router/product-router");
const connectDb = require("./utils/db");
const errorMiddleWare = require("./middleware/error-middleware");

const PORT = 8000;

const coreOptions = {
  origin:"http://localhost:5173",
  methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
  Credential:true,
}

app.use(cors()); 
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/form", addProductRoute);


app.use(errorMiddleWare);


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
