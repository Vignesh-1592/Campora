const express = require("express");
const router = express.Router();

const {
    addOrder,
    getAllOrders,
    updateOrder,
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
// Update Order
// ===============================
router.put("/update/:id", verifyToken, updateOrder);

// ===============================
// Delete Order
// ===============================
router.delete("/delete/:id", verifyToken, deleteOrder);

module.exports = router;