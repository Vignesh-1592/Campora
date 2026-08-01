const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        module: {
            type: String,
            enum: [
                "Food",
                "Snacks",
                "Stationery",
                "Book",
                "Print"
            ],
            required: true
        },

        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        isRead: {
            type: Boolean,
            default: false,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Notification", notificationSchema);