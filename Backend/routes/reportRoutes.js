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
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/total-revenue",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getTotalRevenue
);

router.get(
    "/today-revenue",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getTodayRevenue
);

router.get(
    "/monthly-revenue",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getMonthlyRevenue
);

// ======================================
// Dashboard Summary
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/dashboard-summary",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getDashboardSummary
);

// ======================================
// Orders
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/total-orders",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getTotalOrders
);

router.get(
    "/order-status",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getOrderStatusStats
);

// ======================================
// Payment Statistics
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/payment-stats",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getPaymentStats
);

// ======================================
// Department Revenue
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/department-revenue",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getDepartmentRevenue
);

// ======================================
// Top Selling Products
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/top-products",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getTopSellingProducts
);

module.exports = router;