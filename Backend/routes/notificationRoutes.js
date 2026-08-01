const express = require("express");
const router = express.Router();

const {

    createNotification,
    getMyNotifications,
    getAllNotifications,
    markAsRead,
    deleteNotification,
    getUnreadCount

} = require("../controllers/notificationController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Create Notification (Admin/Staff)
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("admin", "staff"),
    createNotification
);

// ======================================
// Get My Notifications (Student)
// ======================================

router.get(
    "/my",
    verifyToken,
    authorizeRoles("student"),
    getMyNotifications
);

// ======================================
// Get All Notifications (Admin)
// ======================================

router.get(
    "/all",
    verifyToken,
    authorizeRoles("admin"),
    getAllNotifications
);

// ======================================
// Unread Notification Count
// ======================================

router.get(
    "/unread-count",
    verifyToken,
    getUnreadCount
);

// ======================================
// Mark Notification as Read
// ======================================

router.put(
    "/read/:id",
    verifyToken,
    markAsRead
);

// ======================================
// Delete Notification
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    deleteNotification
);

module.exports = router;