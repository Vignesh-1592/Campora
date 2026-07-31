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
// Add Product (Staff/Admin)
// ======================================
router.post(
    "/add",
    verifyToken,
    authorizeRoles("staff", "admin"),
    addProduct
);

// ======================================
// Get All Products (Everyone)
// ======================================
router.get(
    "/",
    verifyToken,
    getAllProducts
);
// ======================================
// Get Products By Module
// ======================================

router.get(
    "/module/:module",
    verifyToken,
    getProductsByModule
);

// ======================================
// Update Product
// ======================================

router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("staff", "admin"),
    updateProduct
);

// ======================================
// Delete Product
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("staff", "admin"),
    deleteProduct
);

module.exports = router;