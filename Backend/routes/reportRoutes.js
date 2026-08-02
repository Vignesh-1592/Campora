const express = require("express");
const router = express.Router();

const {

    getTotalRevenue,
    getTodayRevenue,
    getWeeklyRevenue,
    getMonthlyRevenue,
    getYearlyRevenue,
    getDashboardSummary,
    getDepartmentRevenue,
    getTotalOrders,
    getOrderStatusStats,
    getPaymentStats,
    getTopSellingProducts,
    getCustomDateReport,
    getModuleReport

} = require("../controllers/reportController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Revenue Reports
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
    "/weekly-revenue",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getWeeklyRevenue
);

router.get(
    "/monthly-revenue",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getMonthlyRevenue
);

router.get(
    "/yearly-revenue",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getYearlyRevenue
);

// ======================================
// Dashboard Summary
// ======================================

router.get(
    "/dashboard-summary",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getDashboardSummary
);

// ======================================
// Order Reports
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
// Payment Reports
// ======================================

router.get(
    "/payment-stats",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getPaymentStats
);

// ======================================
// Department Revenue
// ======================================

router.get(
    "/department-revenue",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getDepartmentRevenue
);

// ======================================
// Module Report
// ======================================

router.get(
    "/module-report",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getModuleReport
);

// ======================================
// Custom Date Report
// ======================================

router.get(
    "/custom-report",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getCustomDateReport
);

// ======================================
// Top Selling Products
// ======================================

router.get(
    "/top-products",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getTopSellingProducts
);

module.exports = router;