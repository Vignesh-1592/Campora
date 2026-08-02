const express = require("express");
const router = express.Router();

const {

    createNotification,
    getMyNotifications,
    getAllNotifications,
    searchNotifications,
    getNotificationsByModule,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification

} = require("../controllers/notificationController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ======================================
// Create Notification
// Super Admin + Department Admin
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    createNotification
);

// ======================================
// Get My Notifications
// Student + Department Admin + Super Admin
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
// Super Admin Only
// ======================================

router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin"),
    getAllNotifications
);

// ======================================
// Search Notifications
// Super Admin Only
// ======================================

router.get(
    "/search",
    verifyToken,
    authorizeRoles("superadmin"),
    searchNotifications
);

// ======================================
// Get Notifications By Module
// All Logged-in Users
// ======================================

router.get(
    "/module",
    verifyToken,
    authorizeRoles(
        "student",
        "departmentadmin",
        "superadmin"
    ),
    getNotificationsByModule
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
// Mark Notification As Read
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
// Mark All Notifications As Read
// All Logged-in Users
// ======================================

router.put(
    "/mark-all-read",
    verifyToken,
    authorizeRoles(
        "student",
        "departmentadmin",
        "superadmin"
    ),
    markAllAsRead
);

// ======================================
// Delete Notification
// All Logged-in Users
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