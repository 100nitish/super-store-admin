require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const path = require("path")


const app = express();
const authRoute = require("./router/auth-router");
const addProductRoute = require("./router/product-router");
const connectDb = require("./utils/db");
const errorMiddleWare = require("./middleware/error-middleware");
const adminRoute = require("./router/admin-router")

const PORT = process.env.PORT || 8000;


app.use(cors()); 
app.use(express.json()); 
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoute); 
app.use("/api/form", addProductRoute);
console.log(adminRoute)
app.use("/api/admin", adminRoute); 


app.use(errorMiddleWare);


(async () => {
  try {
    await connectDb(); 
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database or start the server:", error);
    process.exit(1); 
  }
})();


