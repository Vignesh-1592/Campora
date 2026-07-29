const mongoose = require("mongoose");

const snackSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String
    },

    available: {
        type: Boolean,
        default: true
    },

    stock: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Snack", snackSchema);