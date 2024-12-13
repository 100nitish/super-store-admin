const AddProduct = require("../models/add-Product");

const addProduct = async (req, res) => {
    try {
      const { title, description, price, rating } = req.body;
      const image = req.file;
  
      if (!title || !image || !description || !price || !rating) {
        return res.status(400).json({ message: "All fields are required, including an image." });
      }
  
      const productData = {
        title,
        description,
        price,
        rating,
        image: image.path,
      };
  
      const product = await AddProduct.create(productData);
      return res.status(200).json({ message: "Product added successfully", product });
    } catch (error) {
      console.error("Error adding product:", error);
      return res.status(500).json({ message: "Failed to add product", error: error.message });
    }
  };
  

module.exports = { addProduct };
