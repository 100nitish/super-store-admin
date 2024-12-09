const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller"); 

router.route("/").get(authControllers.home);
router.route("/register").post(authControllers.register);
router.route("/register").get(authControllers.getRegister);
// routet.route("/add-product").post(authControllers.addProduct);


module.exports = router;
