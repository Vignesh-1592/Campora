const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(

    {
        // Food Name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Food Description
        description: {
            type: String,
            required: true,
            trim: true,
        },

        // Food Category
        category: {
            type: String,
            enum: ["Meal", "Snack", "Beverage", "Dessert"],
            required: true,
        },

        // Food Price
        price: {
            type: Number,
            required: true,
        },

        // Food Image
        image: {
            type: String,
            default: "",
        },

        // Food Availability
        available: {
            type: Boolean,
            default: true,
        },

        // Department
        department: {
            type: String,
            default: "Food Court",
        },
    },

    {
        timestamps: true,
    }

);

module.exports = mongoose.model("Food", foodSchema);