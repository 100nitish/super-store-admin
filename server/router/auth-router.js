const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller"); 
const {signUpSchema} = require("../validators/auth-validator")
const {validate}= require("../middleware/validate-middleware")

router.route("/").get(authControllers.home);
router.route("/register").post(validate(signUpSchema), authControllers.register);
router.route("/register").get(authControllers.getRegister);
router.route("/login").post(authControllers.login);
// router.route("/add-product").post(authControllers.addProduct);


module.exports = router;
