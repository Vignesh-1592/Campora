const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
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

        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true
        },

        stock: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            default: ""
        },

        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);