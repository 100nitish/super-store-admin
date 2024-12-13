const { Schema, model } = require("mongoose");


const addProductSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }, 
    description: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, required: true },
}, { timestamps: true }); 


const AddProduct = model("AddProduct", addProductSchema);
module.exports = AddProduct;
