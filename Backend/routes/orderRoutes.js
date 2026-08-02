const express = require("express");
const router = express.Router();

const {

    addOrder,
    getAllOrders,
    getMyOrders,
    getStaffHistory,
    searchOrders,
    getOrdersByStatus,
    paginateOrders,
    updateOrder,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder

} = require("../controllers/orderController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Student Routes
// ======================================

// Place Order
router.post(
    "/add",
    verifyToken,
    authorizeRoles("student"),
    addOrder
);

// My Orders
router.get(
    "/my-orders",
    verifyToken,
    authorizeRoles("student"),
    getMyOrders
);

// ======================================
// Department Admin & Super Admin
// ======================================

// Get All Orders
router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getAllOrders
);

// Department History
router.get(
    "/department-history",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getStaffHistory
);

// Search Orders
router.get(
    "/search",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    searchOrders
);

// Filter Orders By Status
router.get(
    "/status",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    getOrdersByStatus
);

// Pagination
router.get(
    "/paginate",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    paginateOrders
);

// Update Order
router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    updateOrder
);

// Update Order Status
router.put(
    "/status/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    updateOrderStatus
);

// Update Payment Status
router.put(
    "/payment/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    updatePaymentStatus
);

// Delete Order
router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin"),
    deleteOrder
);

module.exports = router;