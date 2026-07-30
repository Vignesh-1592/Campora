const express = require("express");
const router = express.Router();

const {
    getStaffDashboard,
    getStudentDashboard
} = require("../controllers/dashboardController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Staff Dashboard
// ======================================
router.get(
    "/staff",
    verifyToken,
    authorizeRoles("staff", "admin"),
    getStaffDashboard
);

// ======================================
// Student Dashboard
// ======================================
router.get(
    "/student",
    verifyToken,
    authorizeRoles("student"),
    getStudentDashboard
);

module.exports = router;