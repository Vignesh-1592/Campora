const mongoose = require("mongoose");
const Snack = require("../models/Snack");

// ======================================
// Add Snack
// ======================================
exports.addSnack = async (req, res) => {

    try {

        const {
            name,
            brand,
            category,
            description,
            price,
            image,
            available,
            stock
        } = req.body;

        // Required Field Validation
        if (!name || !brand || !category || price == null) {
            return res.status(400).json({
                success: false,
                message: "Name, Brand, Category and Price are required."
            });
        }

        // Duplicate Snack Check
        const existingSnack = await Snack.findOne({
            name: name.trim()
        });

        if (existingSnack) {
            return res.status(409).json({
                success: false,
                message: "Snack already exists."
            });
        }

        const snack = await Snack.create({
            name,
            brand,
            category,
            description,
            price,
            image,
            available,
            stock
        });

        return res.status(201).json({
            success: true,
            message: "Snack Added Successfully",
            snack
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
// Get All Snacks
// ======================================
exports.getAllSnacks = async (req, res) => {

    try {

        const snacks = await Snack.find();

        return res.status(200).json({
            success: true,
            message: "Snacks Retrieved Successfully",
            count: snacks.length,
            snacks
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
// Search Snack
// Search by Name OR Description
// ======================================
exports.searchSnack = async (req, res) => {

    try {

        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Snack name is required for searching."
            });
        }

        const snacks = await Snack.find({

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

        if (snacks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No snacks found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Snack Search Successful",
            count: snacks.length,
            snacks
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
// Filter Snack By Category
// ======================================
exports.getSnackByCategory = async (req, res) => {

    try {

        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required."
            });
        }

        const snacks = await Snack.find({
            category: name
        });

        if (snacks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No snacks found in this category."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Snacks Retrieved Successfully",
            count: snacks.length,
            snacks
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
// Get Available Snacks
// ======================================
exports.getAvailableSnacks = async (req, res) => {

    try {

        const snacks = await Snack.find({
            available: true
        });

        if (snacks.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No available snacks found."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Available Snacks Retrieved Successfully",
            count: snacks.length,
            snacks
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
// Sort Snacks By Price
// ======================================
exports.sortSnackByPrice = async (req, res) => {

    try {

        const order = req.query.order === "desc" ? -1 : 1;

        const snacks = await Snack.find().sort({
            price: order
        });

        return res.status(200).json({
            success: true,
            message: "Snacks Sorted Successfully",
            count: snacks.length,
            snacks
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
exports.paginateSnack = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalSnacks = await Snack.countDocuments();

        const snacks = await Snack.find()
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            message: "Snacks Retrieved Successfully",
            currentPage: page,
            totalPages: Math.ceil(totalSnacks / limit),
            totalSnacks,
            count: snacks.length,
            snacks
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
// Update Snack
// ======================================
exports.updateSnack = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Snack ID."
            });

        }

        const updatedSnack = await Snack.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedSnack) {

            return res.status(404).json({
                success: false,
                message: "Snack Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Snack Updated Successfully",
            snack: updatedSnack
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
// Delete Snack
// ======================================
exports.deleteSnack = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Snack ID."
            });

        }

        const deletedSnack = await Snack.findByIdAndDelete(id);

        if (!deletedSnack) {

            return res.status(404).json({
                success: false,
                message: "Snack Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Snack Deleted Successfully",
            snack: deletedSnack
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};