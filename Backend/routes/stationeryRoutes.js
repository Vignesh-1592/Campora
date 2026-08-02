const express = require("express");
const router = express.Router();

const {

    addStationeryItem,
    getAllStationeryItems,
    searchStationeryItem,
    getStationeryByCategory,
    getAvailableStationeryItems,
    sortStationeryByPrice,
    paginateStationeryItems,
    updateStationeryItem,
    deleteStationeryItem

} = require("../controllers/stationeryController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Add Stationery Item
// Super Administrator + Stationery Department Administrator
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    addStationeryItem
);

// ======================================
// Get All Stationery Items
// ======================================

router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    getAllStationeryItems
);

// ======================================
// Search Stationery Item
// Search by Name & Description
// ======================================

router.get(
    "/search",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    searchStationeryItem
);

// ======================================
// Filter Stationery By Category
// ======================================

router.get(
    "/category",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    getStationeryByCategory
);

// ======================================
// Get Available Stationery Items
// ======================================

router.get(
    "/available",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    getAvailableStationeryItems
);

// ======================================
// Sort Stationery By Price
// ======================================

router.get(
    "/sort",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    sortStationeryByPrice
);

// ======================================
// Pagination
// ======================================

router.get(
    "/paginate",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    paginateStationeryItems
);

// ======================================
// Update Stationery Item
// ======================================

router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    updateStationeryItem
);

// ======================================
// Delete Stationery Item
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    deleteStationeryItem
);

module.exports = router;