const express = require("express");
const router = express.Router();

const {

    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changePassword,
    getAllUsers,
    updateUserStatus

} = require("../controllers/userController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Authentication
// ======================================

// Register User
router.post(
    "/register",
    registerUser
);

// Login User
router.post(
    "/login",
    loginUser
);

// ======================================
// User Profile
// ======================================

// Get Profile
router.get(
    "/profile",
    verifyToken,
    getUserProfile
);

// Update Profile
router.put(
    "/profile",
    verifyToken,
    updateUserProfile
);

// Change Password
router.put(
    "/change-password",
    verifyToken,
    changePassword
);

// ======================================
// Super Administrator
// ======================================

// Get All Users
router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin"),
    getAllUsers
);

// Activate / Deactivate User
router.put(
    "/status/:id",
    verifyToken,
    authorizeRoles("superadmin"),
    updateUserStatus
);

module.exports = router;