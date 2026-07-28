const express = require("express");
const router = express.Router();

const {
    addStationeryItem,
    getAllStationeryItems,
    updateStationeryItem,
    deleteStationeryItem,
} = require("../controllers/stationeryController");

// ===============================
// Add Stationery Item
// ===============================
router.post("/add", addStationeryItem);

// Get All Stationery Items
router.get("/", getAllStationeryItems);

// Update Stationery Item
router.put("/update/:id", updateStationeryItem);

// Delete Stationery Item
router.delete("/delete/:id", deleteStationeryItem);

module.exports = router;