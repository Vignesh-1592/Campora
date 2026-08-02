const express = require("express");
const router = express.Router();

const {

    addInventory,
    getAllInventory,
    getDepartmentInventory,
    searchInventory,
    getInventoryByModule,
    paginateInventory,
    updateInventory,
    deleteInventory,
    getLowStockInventory,
    getLowStockCount

} = require("../controllers/inventoryController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Add Inventory
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
// ======================================

router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin"),
    getAllInventory
);

// ======================================
// Department Inventory
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
// Search Inventory
// ======================================

router.get(
    "/search",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    searchInventory
);

// ======================================
// Filter Inventory By Module
// ======================================

router.get(
    "/module",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getInventoryByModule
);

// ======================================
// Inventory Pagination
// ======================================

router.get(
    "/paginate",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    paginateInventory
);

// ======================================
// Update Inventory
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
// ======================================

router.get(
    "/low-stock",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getLowStockInventory
);

// ======================================
// Low Stock Count
// ======================================

router.get(
    "/low-stock-count",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getLowStockCount
);

module.exports = router;