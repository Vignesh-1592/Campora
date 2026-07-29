const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
} = require("../controllers/userController");

const verifyToken = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// User Profile
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;