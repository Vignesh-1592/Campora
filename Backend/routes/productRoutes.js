const express = require("express");
const router = express.Router();

const {

    addProduct,
    getAllProducts,
    getProductsByModule,
    updateProduct,
    deleteProduct

} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Add Product
// Super Administrator + Department Administrator
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    addProduct
);

// ======================================
// Get All Products
// All Logged-in Users
// ======================================

router.get(
    "/",
    verifyToken,
    getAllProducts
);

// ======================================
// Get Products By Module
// All Logged-in Users
// ======================================

router.get(
    "/module/:module",
    verifyToken,
    getProductsByModule
);

// ======================================
// Update Product
// Super Administrator + Department Administrator
// ======================================

router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    updateProduct
);

// ======================================
// Delete Product
// Super Administrator + Department Administrator
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    deleteProduct
);

module.exports = router;