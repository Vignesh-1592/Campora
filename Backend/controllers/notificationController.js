const mongoose = require("mongoose");
const Notification = require("../models/Notification");

// ======================================
// Create Notification
// ======================================
exports.createNotification = async (req, res) => {

    try {

        const {
            user,
            module,
            title,
            message
        } = req.body;

        // Required Field Validation
        if (!user || !module || !title || !message) {

            return res.status(400).json({
                success: false,
                message: "User, Module, Title and Message are required."
            });

        }

        const notification = await Notification.create({

            user,
            module,
            title,
            message

        });

        return res.status(201).json({

            success: true,
            message: "Notification Created Successfully",
            notification

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Get My Notifications
// ======================================
exports.getMyNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({

            user: req.user.id

        })

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,
            message: "Notifications Retrieved Successfully",
            count: notifications.length,
            notifications

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Get All Notifications
// Super Admin
// ======================================
exports.getAllNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find()

            .populate(
                "user",
                "name rollNumber employeeId department"
            )

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,
            message: "All Notifications Retrieved Successfully",
            count: notifications.length,
            notifications

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Search Notifications
// Search by Title
// ======================================
exports.searchNotifications = async (req, res) => {

    try {

        const { title } = req.query;

        if (!title) {

            return res.status(400).json({

                success: false,
                message: "Notification title is required."

            });

        }

        const notifications = await Notification.find({

            title: {

                $regex: title,
                $options: "i"

            }

        })

        .populate(
            "user",
            "name rollNumber employeeId"
        );

        if (notifications.length === 0) {

            return res.status(404).json({

                success: false,
                message: "No notifications found."

            });

        }

        return res.status(200).json({

            success: true,
            message: "Notification Search Successful",
            count: notifications.length,
            notifications

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Get Notifications By Module
// ======================================
exports.getNotificationsByModule = async (req, res) => {

    try {

        const { module } = req.query;

        if (!module) {

            return res.status(400).json({
                success: false,
                message: "Module is required."
            });

        }

        const notifications = await Notification.find({

            user: req.user.id,
            module

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,
            message: "Notifications Retrieved Successfully",
            count: notifications.length,
            notifications

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Get Unread Notification Count
// ======================================
exports.getUnreadCount = async (req, res) => {

    try {

        const count = await Notification.countDocuments({

            user: req.user.id,
            isRead: false

        });

        return res.status(200).json({

            success: true,
            message: "Unread Notification Count Retrieved Successfully",
            unreadCount: count

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Mark Notification As Read
// ======================================
exports.markAsRead = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,
                message: "Invalid Notification ID."

            });

        }

        const notification = await Notification.findById(id);

        if (!notification) {

            return res.status(404).json({

                success: false,
                message: "Notification Not Found"

            });

        }

        // Ownership Check
        if (
            req.user.role !== "superadmin" &&
            notification.user.toString() !== req.user.id
        ) {

            return res.status(403).json({

                success: false,
                message: "You are not authorized to access this notification."

            });

        }

        notification.isRead = true;

        await notification.save();

        return res.status(200).json({

            success: true,
            message: "Notification Marked as Read",
            notification

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Mark All Notifications As Read
// ======================================
exports.markAllAsRead = async (req, res) => {

    try {

        await Notification.updateMany(

            {

                user: req.user.id,
                isRead: false

            },

            {

                isRead: true

            }

        );

        return res.status(200).json({

            success: true,
            message: "All Notifications Marked as Read"

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Delete Notification
// ======================================
exports.deleteNotification = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,
                message: "Invalid Notification ID."

            });

        }

        const notification = await Notification.findById(id);

        if (!notification) {

            return res.status(404).json({

                success: false,
                message: "Notification Not Found"

            });

        }

        // Ownership Check
        if (
            req.user.role !== "superadmin" &&
            notification.user.toString() !== req.user.id
        ) {

            return res.status(403).json({

                success: false,
                message: "You are not authorized to delete this notification."

            });

        }

        await Notification.findByIdAndDelete(id);

        return res.status(200).json({

            success: true,
            message: "Notification Deleted Successfully"

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};