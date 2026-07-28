const express = require("express");
const router = express.Router();

const {
    createNotification,
    getMyNotifications,
    markAsRead,
} = require("../controllers/notificationController");

const { verifyToken } = require("../middleware/authMiddleware");

// Create Notification
router.post("/create", verifyToken, createNotification);

// Get Logged-in User Notifications
router.get("/", verifyToken, getMyNotifications);

// Mark Notification as Read
router.put("/read/:id", verifyToken, markAsRead);

module.exports = router;