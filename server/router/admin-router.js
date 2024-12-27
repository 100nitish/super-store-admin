const express = require("express");
const  getAllUsers  = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();

router.route('/users').get(authMiddleware,adminMiddleware,getAllUsers); 

module.exports = router


