const AddProduct = require("../models/add-Product");

const addProduct = async (req, res) => {
    try {
        const productData = req.body; 

        
        if (!productData.title || !productData.image || !productData.description || !productData.price || !productData.rating) {
            return res.status(400).json({ message: "All fields are required" });
        }

       
        await AddProduct.create(productData);

        return res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add product", error: error.message });
    }
};

module.exports = addProduct;
