const express = require("express");
const router = express.Router();

const {

    addStationeryItem,
    getAllStationeryItems,
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
// Super Administrator + Stationery Department Administrator
// ======================================

router.get(
    "/",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    getAllStationeryItems
);

// ======================================
// Update Stationery Item
// Super Administrator + Stationery Department Administrator
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
// Super Administrator + Stationery Department Administrator
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Stationery"),
    deleteStationeryItem
);

module.exports = router;