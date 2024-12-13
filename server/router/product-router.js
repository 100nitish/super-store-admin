const express = require("express");
const { addProduct } = require("../controllers/addProduct-controller");
const upload = require("../utils/multerConfig");

const router = express.Router();


router.post("/add-product", upload.single("image"), addProduct);

module.exports = router;
