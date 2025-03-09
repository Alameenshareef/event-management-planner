const express = require("express");
const { register, login,getUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleware, getUserProfile); 

module.exports = router;
