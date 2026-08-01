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

        const notification = new Notification({

            user,
            module,
            title,
            message

        });

        await notification.save();

        return res.status(201).json({

            message: "Notification Created Successfully",

            notification

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
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
        .sort({ createdAt: -1 });

        return res.status(200).json({

            message: "Notifications Retrieved Successfully",

            count: notifications.length,

            notifications

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Get All Notifications (Admin)
// ======================================

exports.getAllNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find()

            .populate("user", "name rollNumber employeeId")

            .sort({ createdAt: -1 });

        return res.status(200).json({

            message: "All Notifications Retrieved Successfully",

            count: notifications.length,

            notifications

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

// ======================================
// Mark Notification as Read
// ======================================

exports.markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {

            return res.status(404).json({

                message: "Notification Not Found"

            });

        }

        notification.isRead = true;

        await notification.save();

        return res.status(200).json({

            message: "Notification Marked as Read",

            notification

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

// ======================================
// Delete Notification
// ======================================

exports.deleteNotification = async (req, res) => {

    try {

        const notification = await Notification.findByIdAndDelete(req.params.id);

        if (!notification) {

            return res.status(404).json({

                message: "Notification Not Found"

            });

        }

        return res.status(200).json({

            message: "Notification Deleted Successfully",

            notification

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

// ======================================
// Unread Notification Count
// ======================================

exports.getUnreadCount = async (req, res) => {

    try {

        const count = await Notification.countDocuments({

            user: req.user.id,

            isRead: false

        });

        return res.status(200).json({

            message: "Unread Notification Count Retrieved Successfully",

            unreadCount: count

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};