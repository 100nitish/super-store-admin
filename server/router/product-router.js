const express = require("express");
const router = express.Router();
const addProductForm = require("../controllers/addProduct-controller")

router.route("/add-product").post(addProductForm)

module.exports = router;