const express = require("express");
const  getAllUsers  = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware")

const router = express.Router();

router.route('/users').get(authMiddleware,getAllUsers); 

module.exports = router


