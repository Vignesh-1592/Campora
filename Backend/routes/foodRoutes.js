const express = require("express");
const router = express.Router();

const {

    addFood,
    getAllFood,
    searchFood,
    getFoodByCategory,
    getAvailableFood,
    sortFoodByPrice,
    paginateFood,
    updateFood,
    deleteFood

} = require("../controllers/foodController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Add Food
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
// ======================================

router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    getAllFood
);

// ======================================
// Search Food
// Search by Name / Description
// ======================================

router.get(
    "/search",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    searchFood
);

// ======================================
// Filter By Category
// ======================================

router.get(
    "/category",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    getFoodByCategory
);

// ======================================
// Get Available Food
// ======================================

router.get(
    "/available",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    getAvailableFood
);

// ======================================
// Sort Food By Price
// order=asc / desc
// ======================================

router.get(
    "/sort",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    sortFoodByPrice
);

// ======================================
// Pagination
// page & limit
// ======================================

router.get(
    "/paginate",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    paginateFood
);

// ======================================
// Update Food
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
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Food"),
    deleteFood
);

module.exports = router;