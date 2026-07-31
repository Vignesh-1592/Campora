const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    module: {
        type: String,
        required: true,
        enum: [
            "Food",
            "Snacks",
            "Stationery",
            "Book Depot",
            "Print Centre"
        ]
    },

    productName: {
        type: String,
        required: true,
        trim: true
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
});

module.exports = mongoose.model("Product", productSchema);