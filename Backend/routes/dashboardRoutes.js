const express = require("express");
const router = express.Router();

const { getStaffDashboard } = require("../controllers/dashboardController");

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

module.exports = router;