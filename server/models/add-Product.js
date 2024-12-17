const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: false,
  },
  image: {
    type: String, 
    required: false,
  },
}, { timestamps: true }); 

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
