const express = require("express");
const router = express.Router();

const {
    addFood,
    getAllFood,
    updateFood,
    deleteFood,
} = require("../controllers/foodController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Add Food
// Admin + Food Department
// ======================================
router.post(
    "/add",
    verifyToken,
    authorizeDepartment("Food"),
    addFood
);

// ======================================
// Get All Food
// Admin + Food Department
// ======================================
router.get(
    "/all",
    verifyToken,
    authorizeDepartment("Food"),
    getAllFood
);

// ======================================
// Update Food
// Admin + Food Department
// ======================================
router.put(
    "/update/:id",
    verifyToken,
    authorizeDepartment("Food"),
    updateFood
);

// ======================================
// Delete Food
// Admin + Food Department
// ======================================
router.delete(
    "/delete/:id",
    verifyToken,
    authorizeDepartment("Food"),
    deleteFood
);

module.exports = router;