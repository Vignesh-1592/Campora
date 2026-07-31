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

// ======================================
// Add Inventory
// ======================================
router.post(
    "/add",
    verifyToken,
    authorizeRoles("staff", "admin"),
    addInventory
);

// ======================================
// Get All Inventory (Admin)
// ======================================
router.get(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    getAllInventory
);

// ======================================
// Get Department Inventory (Staff)
// ======================================
router.get(
    "/department",
    verifyToken,
    authorizeRoles("staff"),
    getDepartmentInventory
);

// ======================================
// Update Inventory
// ======================================
router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("staff", "admin"),
    updateInventory
);

// ======================================
// Delete Inventory
// ======================================
router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("staff", "admin"),
    deleteInventory
);

// ======================================
// Low Stock Inventory
// ======================================
router.get(
    "/low-stock",
    verifyToken,
    authorizeRoles("staff", "admin"),
    getLowStockInventory
);

module.exports = router;