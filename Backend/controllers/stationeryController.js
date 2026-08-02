const mongoose = require("mongoose");
const StationeryItem = require("../models/StationeryItem");

// ======================================
// Add Stationery Item
// ======================================
exports.addStationeryItem = async (req, res) => {

    try {

        const {
            name,
            description,
            category,
            price,
            image,
            available,
            stock
        } = req.body;

        // Required Field Validation
        if (!name || !description || !category || price == null) {
            return res.status(400).json({
                success: false,
                message: "Name, Description, Category and Price are required."
            });
        }

        // Duplicate Validation
        const existingItem = await StationeryItem.findOne({
            name: name.trim()
        });

        if (existingItem) {
            return res.status(409).json({
                success: false,
                message: "Stationery item already exists."
            });
        }

        const item = await StationeryItem.create({
            name,
            description,
            category,
            price,
            image,
            available,
            stock
        });

        return res.status(201).json({
            success: true,
            message: "Stationery Item Added Successfully",
            item
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
// Get All Stationery Items
// ======================================
exports.getAllStationeryItems = async (req, res) => {

    try {

        const items = await StationeryItem.find();

        return res.status(200).json({
            success: true,
            message: "Stationery Items Retrieved Successfully",
            count: items.length,
            items
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
// Search Stationery Item
// Search by Name OR Description
// ======================================
exports.searchStationeryItem = async (req, res) => {

    try {

        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Stationery item name is required."
            });
        }

        const items = await StationeryItem.find({

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

        if (items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No stationery items found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stationery Search Successful",
            count: items.length,
            items
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
// Filter Stationery By Category
// ======================================
exports.getStationeryByCategory = async (req, res) => {

    try {

        const { name } = req.query;

        if (!name) {

            return res.status(400).json({
                success: false,
                message: "Category name is required."
            });

        }

        const items = await StationeryItem.find({
            category: name
        });

        if (items.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No stationery items found in this category."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Stationery Items Retrieved Successfully",
            count: items.length,
            items
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
// Get Available Stationery Items
// ======================================
exports.getAvailableStationeryItems = async (req, res) => {

    try {

        const items = await StationeryItem.find({
            available: true
        });

        if (items.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No available stationery items found."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Available Stationery Items Retrieved Successfully",
            count: items.length,
            items
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
// Sort Stationery By Price
// ======================================
exports.sortStationeryByPrice = async (req, res) => {

    try {

        const order = req.query.order === "desc" ? -1 : 1;

        const items = await StationeryItem.find().sort({
            price: order
        });

        return res.status(200).json({
            success: true,
            message: "Stationery Items Sorted Successfully",
            count: items.length,
            items
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
exports.paginateStationeryItems = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalItems = await StationeryItem.countDocuments();

        const items = await StationeryItem.find()
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            message: "Stationery Items Retrieved Successfully",
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems,
            count: items.length,
            items
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
// Update Stationery Item
// ======================================
exports.updateStationeryItem = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Stationery Item ID."
            });

        }

        const updatedItem = await StationeryItem.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedItem) {

            return res.status(404).json({
                success: false,
                message: "Stationery Item Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Stationery Item Updated Successfully",
            item: updatedItem
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
// Delete Stationery Item
// ======================================
exports.deleteStationeryItem = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Stationery Item ID."
            });

        }

        const deletedItem = await StationeryItem.findByIdAndDelete(id);

        if (!deletedItem) {

            return res.status(404).json({
                success: false,
                message: "Stationery Item Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Stationery Item Deleted Successfully",
            item: deletedItem
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};