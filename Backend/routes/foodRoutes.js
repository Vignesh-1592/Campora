const express = require("express");
const router = express.Router();

const {

    addFood,
    getAllFood,
    updateFood,
    deleteFood

} = require("../controllers/foodController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Add Food
// Super Administrator + Food Department Administrator
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    addFood
);

// ======================================
// Get All Food
// Super Administrator + Food Department Administrator
// ======================================

router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    getAllFood
);

// ======================================
// Update Food
// Super Administrator + Food Department Administrator
// ======================================

router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    updateFood
);

// ======================================
// Delete Food
// Super Administrator + Food Department Administrator
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    deleteFood
);

module.exports = router;