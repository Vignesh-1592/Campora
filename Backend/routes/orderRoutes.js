const express = require("express");
const router = express.Router();

const {

    addOrder,
    getAllOrders,
    getMyOrders,
    getStaffHistory,
    updateOrder,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder

} = require("../controllers/orderController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Place Order
// Student Only
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("student"),
    addOrder
);

// ======================================
// Get Orders
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getAllOrders
);

// ======================================
// Student Order History
// Student Only
// ======================================

router.get(
    "/my-orders",
    verifyToken,
    authorizeRoles("student"),
    getMyOrders
);

// ======================================
// Department Order History
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/department-history",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getStaffHistory
);

// ======================================
// Update Order
// Super Administrator + Department Administrator
// ======================================

router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    updateOrder
);

// ======================================
// Update Order Status
// Super Administrator + Department Administrator
// ======================================

router.put(
    "/status/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    updateOrderStatus
);

// ======================================
// Update Payment Status
// Super Administrator + Department Administrator
// ======================================

router.put(
    "/payment/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    updatePaymentStatus
);

// ======================================
// Delete Order
// Super Administrator Only
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin"),
    deleteOrder
);

module.exports = router;