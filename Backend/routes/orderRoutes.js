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

// ===============================
// Add Order
// ===============================
router.post("/add", verifyToken, addOrder);

// ===============================
// Get All Orders
// ===============================
router.get("/", verifyToken, getAllOrders);

// ===============================
// Get Student Order History
// ===============================
router.get("/my-orders", verifyToken, getMyOrders);

// ===============================
// Get Staff Department Order History
// ===============================
router.get("/staff-history", verifyToken, getStaffHistory);

// ===============================
// Update Complete Order
// ===============================
router.put("/update/:id", verifyToken, updateOrder);

// ===============================
// Update Order Status
// ===============================
router.put("/status/:id", verifyToken, updateOrderStatus);

// ===============================
// Update Payment Status
// ===============================
router.put("/payment/:id", verifyToken, updatePaymentStatus);

// ===============================
// Delete Order
// ===============================
router.delete("/delete/:id", verifyToken, deleteOrder);

module.exports = router;