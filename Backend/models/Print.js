const mongoose = require("mongoose");

const printSchema = new mongoose.Schema(
    {
        documentName: {
            type: String,
            required: true,
        },

        file: {
            type: String,
            default: "",
        },

        printType: {
            type: String,
            enum: [
                "Black & White",
                "Full Color",
                "Mixed"
            ],
            required: true,
        },

        colorPages: {
            type: String,
            default: "",
        },

        printingSide: {
            type: String,
            enum: [
                "Single Side",
                "Front & Back"
            ],
            default: "Single Side",
        },

        paperSize: {
            type: String,
            enum: [
                "A4",
                "A3"
            ],
            default: "A4",
        },

        orientation: {
            type: String,
            enum: [
                "Portrait",
                "Landscape"
            ],
            default: "Portrait",
        },

        pageRange: {
            type: String,
            default: "All",
        },

        copies: {
            type: Number,
            required: true,
        },

        binding: {
            type: String,
            enum: [
                "None",
                "Staple",
                "Spiral"
            ],
            default: "None",
        },

        price: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Ready for Pickup"
            ],
            default: "Pending",
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Print", printSchema);