const express = require("express");
const router = express.Router();

const {

    getStaffDashboard,
    getStudentDashboard

} = require("../controllers/dashboardController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Department Dashboard
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/department",
    verifyToken,
    authorizeRoles(
        "superadmin",
        "departmentadmin"
    ),
    getStaffDashboard
);

// ======================================
// Student Dashboard
// Student Only
// ======================================

router.get(
    "/student",
    verifyToken,
    authorizeRoles("student"),
    getStudentDashboard
);

module.exports = router;