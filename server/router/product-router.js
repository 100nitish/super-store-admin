const express = require('express');
const Product = require('../models/add-Product');
const upload = require('../middleware/upload');

const router = express.Router();


router.post(
  '/add-product',
  (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      console.log('Uploaded file:', req.file);
      next();
    });
  },
  async (req, res) => {
    try {
      const { name, description, price, category } = req.body;

      const imagePath = req.file
        ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        : null;

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
  }
);


router.get('/get-product', async (req, res) => {
  try {
    const products = await Product.find();

    const updatedProducts = products.map((product) => ({
      ...product._doc,
      image: product.image,
    }));

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/get-product/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Received ID:', id);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put(
  '/edit-product/:id',
  (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, category } = req.body;

      const updatedFields = {
        name,
        description,
        price,
        category,
      };

      if (req.file) {
        updatedFields.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


router.delete('/delete-product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
