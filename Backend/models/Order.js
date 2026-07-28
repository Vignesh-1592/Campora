const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        module: {
            type: String,
            enum: ["Food", "Stationery", "Book"],
            required: true,
        },

        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        itemName: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending",
        },

        orderStatus: {
            type: String,
            enum: ["Pending", "Preparing", "Ready for Pickup", "Completed"],
            default: "Pending",
        },

        tokenNumber: {
            type: Number,
            unique: true,
            required: true,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);