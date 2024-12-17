const express = require('express');
const Product = require('../models/add-Product');
const upload = require('../middleware/upload');

const router = express.Router();

// Route to add a product
router.post('/add-product', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    console.log('Uploaded file:', req.file);
    next();
  });
}, async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Construct the image URL if uploaded
    const imagePath = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;

    // Save the product to the database
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: imagePath,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully!', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all products
router.get('/get-product', async (req, res) => {
  try {
    const products = await Product.find();

    // Ensure images are served properly
    const updatedProducts = products.map((product) => ({
      ...product._doc,
      image: product.image, // No change, just returning the image path
    }));

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
