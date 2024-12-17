require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const path = require("path")


const app = express();
const authRoute = require("./router/auth-router");
const addProductRoute = require("./router/product-router");
const connectDb = require("./utils/db");
const errorMiddleWare = require("./middleware/error-middleware");

const PORT = process.env.PORT || 8000;


app.use(cors()); 
app.use(express.json()); 
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoute); 
app.use("/api/form", addProductRoute); 


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


// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const authRoute = require('./router/auth-router');
// const addProductRoute = require('./router/product-router');
// const connectDb = require('./utils/db');
// const errorMiddleWare = require('./middleware/error-middleware');

// const PORT = process.env.PORT || 8000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static files for uploaded images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // API Routes
// app.use('/api/auth', authRoute);
// app.use('/api/form', addProductRoute);

// // Error Handling Middleware
// app.use(errorMiddleWare);

// // Ensure 'uploads' directory exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Start the Server
// (async () => {
//   try {
//     await connectDb(); // Connect to the database
//     app.listen(PORT, () => {
//       console.log(`Server is running at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('Failed to connect to the database or start the server:', error);
//     process.exit(1); // Exit on failure
//   }
// })();
