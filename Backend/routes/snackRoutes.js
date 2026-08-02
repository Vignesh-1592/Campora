const express = require("express");
const router = express.Router();

const {

    addSnack,
    getAllSnacks,
    searchSnack,
    getSnackByCategory,
    getAvailableSnacks,
    sortSnackByPrice,
    paginateSnack,
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
// ======================================

router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    getAllSnacks
);

// ======================================
// Search Snack
// Search by Name & Description
// ======================================

router.get(
    "/search",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    searchSnack
);

// ======================================
// Filter Snacks By Category
// ======================================

router.get(
    "/category",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    getSnackByCategory
);

// ======================================
// Get Available Snacks
// ======================================

router.get(
    "/available",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    getAvailableSnacks
);

// ======================================
// Sort Snacks By Price
// ======================================

router.get(
    "/sort",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    sortSnackByPrice
);

// ======================================
// Pagination
// ======================================

router.get(
    "/paginate",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    paginateSnack
);

// ======================================
// Update Snack
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
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Snacks"),
    deleteSnack
);

module.exports = router;