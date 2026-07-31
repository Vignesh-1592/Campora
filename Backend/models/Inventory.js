const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(

    {

        module: {
            type: String,
            required: true
        },

        productName: {
            type: String,
            required: true
        },

        stock: {
            type: Number,
            required: true,
            default: 0
        },

        minimumStock: {
            type: Number,
            default: 10
        },

        lastUpdatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    },

    {
        timestamps: true
    }

);

module.exports = mongoose.model("Inventory", inventorySchema);