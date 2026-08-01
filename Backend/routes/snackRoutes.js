const express = require("express");
const router = express.Router();

const {

    addSnack,
    getAllSnacks,
    updateSnack,
    deleteSnack

} = require("../controllers/snackController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Add Snack
// Super Administrator + Snacks Department Administrator
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    addSnack
);

// ======================================
// Get All Snacks
// Super Administrator + Snacks Department Administrator
// ======================================

router.get(
    "/",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    getAllSnacks
);

// ======================================
// Update Snack
// Super Administrator + Snacks Department Administrator
// ======================================

router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    updateSnack
);

// ======================================
// Delete Snack
// Super Administrator + Snacks Department Administrator
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    deleteSnack
);

module.exports = router;