const Notification = require("../models/Notification");

// ===============================
// Create Notification
// ===============================
exports.createNotification = async (req, res) => {

    try {

        const { user, title, message } = req.body;

        const notification = new Notification({
            user,
            title,
            message,
        });

        await notification.save();

        return res.status(201).json({
            message: "Notification Created Successfully",
            notification,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};

// ===============================
// Get My Notifications
// ===============================
exports.getMyNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            message: "Notifications Retrieved Successfully",
            count: notifications.length,
            notifications,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};

// ===============================
// Mark Notification as Read
// ===============================
exports.markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            {
                isRead: true,
            },
            {
                new: true,
            }
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification Not Found",
            });
        }

        return res.status(200).json({
            message: "Notification Marked as Read",
            notification,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};