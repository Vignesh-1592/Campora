const express = require("express");
const router = express.Router();

const {

    getTotalRevenue,
    getTodayRevenue,
    getMonthlyRevenue,
    getDashboardSummary,
    getDepartmentRevenue,
    getTotalOrders,
    getOrderStatusStats,
    getPaymentStats,
    getTopSellingProducts

} = require("../controllers/reportController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Revenue APIs
// ======================================

router.get(
    "/total-revenue",
    verifyToken,
    authorizeRoles("admin"),
    getTotalRevenue
);

router.get(
    "/today-revenue",
    verifyToken,
    authorizeRoles("admin"),
    getTodayRevenue
);

router.get(
    "/monthly-revenue",
    verifyToken,
    authorizeRoles("admin"),
    getMonthlyRevenue
);

// ======================================
// Dashboard Summary
// ======================================

router.get(
    "/dashboard-summary",
    verifyToken,
    authorizeRoles("admin"),
    getDashboardSummary
);

// ======================================
// Orders
// ======================================

router.get(
    "/total-orders",
    verifyToken,
    authorizeRoles("admin"),
    getTotalOrders
);

router.get(
    "/order-status",
    verifyToken,
    authorizeRoles("admin"),
    getOrderStatusStats
);

// ======================================
// Payments
// ======================================

router.get(
    "/payment-stats",
    verifyToken,
    authorizeRoles("admin"),
    getPaymentStats
);

// ======================================
// Department Revenue
// ======================================

router.get(
    "/department-revenue",
    verifyToken,
    authorizeRoles("admin"),
    getDepartmentRevenue
);

// ======================================
// Top Selling Products
// ======================================

router.get(
    "/top-products",
    verifyToken,
    authorizeRoles("admin"),
    getTopSellingProducts
);

module.exports = router;