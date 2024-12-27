const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller"); 


router.route("/").get(authControllers.home);
router.route("/register").post( authControllers.register);
router.route('/get-register').get(authControllers.getRegister);
router.route('/delete-register/:id').delete(authControllers.deleteRegister);

router.route("/login").post(authControllers.login);



module.exports = router;
