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
// Create Notification
// Super Administrator + Department Administrator
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    createNotification
);

// ======================================
// Get My Notifications
// All Logged-in Users
// ======================================

router.get(
    "/my",
    verifyToken,
    authorizeRoles(
        "student",
        "departmentadmin",
        "superadmin"
    ),
    getMyNotifications
);

// ======================================
// Get All Notifications
// Super Administrator Only
// ======================================

router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin"),
    getAllNotifications
);

// ======================================
// Get Unread Notification Count
// All Logged-in Users
// ======================================

router.get(
    "/unread-count",
    verifyToken,
    authorizeRoles(
        "student",
        "departmentadmin",
        "superadmin"
    ),
    getUnreadCount
);

// ======================================
// Mark Notification as Read
// All Logged-in Users
// ======================================

router.put(
    "/read/:id",
    verifyToken,
    authorizeRoles(
        "student",
        "departmentadmin",
        "superadmin"
    ),
    markAsRead
);

// ======================================
// Delete Notification
// All Logged-in Users
// Controller validates ownership
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles(
        "student",
        "departmentadmin",
        "superadmin"
    ),
    deleteNotification
);

module.exports = router;