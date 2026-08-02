const Food = require("../models/Food");
const mongoose = require("mongoose");
// ======================================
// Add Food
// ======================================
exports.addFood = async (req, res) => {

    try {

        const {
            name,
            description,
            category,
            price,
            image,
            available,
            department
        } = req.body;

        // Required Field Validation
        if (!name || !description || !category || price == null) {
            return res.status(400).json({
                success: false,
                message: "Name, Description, Category and Price are required."
            });
        }

        // Duplicate Check
        const existingFood = await Food.findOne({
            name: name.trim()
        });

        if (existingFood) {
            return res.status(409).json({
                success: false,
                message: "Food item already exists."
            });
        }

        const food = await Food.create({
            name,
            description,
            category,
            price,
            image,
            available,
            department
        });

        return res.status(201).json({
            success: true,
            message: "Food Added Successfully",
            food
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Get All Food
// ======================================
exports.getAllFood = async (req, res) => {

    try {

        const foods = await Food.find();

        return res.status(200).json({
            success: true,
            message: "Food Items Retrieved Successfully",
            count: foods.length,
            foods
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Search Food
// Search by Name OR Description
// ======================================
exports.searchFood = async (req, res) => {

    try {

        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Food name is required for searching."
            });
        }

        const foods = await Food.find({

            $or: [

                {
                    name: {
                        $regex: name,
                        $options: "i"
                    }
                },

                {
                    description: {
                        $regex: name,
                        $options: "i"
                    }
                }

            ]

        });

        if (foods.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No food items found."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Food Search Successful",
            count: foods.length,
            foods
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Get Food By Category
// ======================================
exports.getFoodByCategory = async (req, res) => {

    try {

        const { name } = req.query;

        if (!name) {

            return res.status(400).json({
                success: false,
                message: "Category name is required."
            });

        }

        const foods = await Food.find({
            category: name
        });

        if (foods.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No food items found in this category."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Food Retrieved Successfully",
            count: foods.length,
            foods
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Get Available Food
// ======================================
exports.getAvailableFood = async (req, res) => {

    try {

        const foods = await Food.find({
            available: true
        });

        if (foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No available food items found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Available Food Retrieved Successfully",
            count: foods.length,
            foods
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Sort Food By Price
// ======================================
exports.sortFoodByPrice = async (req, res) => {

    try {

        const order = req.query.order === "desc" ? -1 : 1;

        const foods = await Food.find().sort({
            price: order
        });

        return res.status(200).json({
            success: true,
            message: "Food Sorted Successfully",
            count: foods.length,
            foods
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Pagination
// ======================================
exports.paginateFood = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalFoods = await Food.countDocuments();

        const foods = await Food.find()
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            message: "Food Retrieved Successfully",
            currentPage: page,
            totalPages: Math.ceil(totalFoods / limit),
            totalFoods,
            count: foods.length,
            foods
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Update Food
// ======================================
exports.updateFood = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Food ID."
            });
        }

        const updatedFood = await Food.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedFood) {

            return res.status(404).json({
                success: false,
                message: "Food Item Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Food Updated Successfully",
            food: updatedFood
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Delete Food
// ======================================
exports.deleteFood = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Food ID."
            });
        }

        const deletedFood = await Food.findByIdAndDelete(id);

        if (!deletedFood) {

            return res.status(404).json({
                success: false,
                message: "Food Item Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Food Deleted Successfully",
            food: deletedFood
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
