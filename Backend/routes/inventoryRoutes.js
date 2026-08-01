const express = require("express");
const router = express.Router();

const {

    addInventory,
    getAllInventory,
    getDepartmentInventory,
    updateInventory,
    deleteInventory,
    getLowStockInventory

} = require("../controllers/inventoryController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Add Inventory
// Super Administrator + Department Administrator
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment(
        "Food",
        "Snacks",
        "Stationery",
        "Book Depot"
    ),
    addInventory
);

// ======================================
// Get All Inventory
// Super Administrator Only
// ======================================

router.get(
    "/",
    verifyToken,
    authorizeRoles("superadmin"),
    getAllInventory
);

// ======================================
// Get Department Inventory
// Department Administrator
// ======================================

router.get(
    "/department",
    verifyToken,
    authorizeRoles("departmentadmin"),
    allowDepartment(
        "Food",
        "Snacks",
        "Stationery",
        "Book Depot"
    ),
    getDepartmentInventory
);

// ======================================
// Update Inventory
// Super Administrator + Department Administrator
// ======================================

router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment(
        "Food",
        "Snacks",
        "Stationery",
        "Book Depot"
    ),
    updateInventory
);

// ======================================
// Delete Inventory
// Super Administrator + Department Administrator
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment(
        "Food",
        "Snacks",
        "Stationery",
        "Book Depot"
    ),
    deleteInventory
);

// ======================================
// Low Stock Inventory
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/low-stock",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment(
        "Food",
        "Snacks",
        "Stationery",
        "Book Depot"
    ),
    getLowStockInventory
);

module.exports = router;