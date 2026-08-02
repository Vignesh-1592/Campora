const mongoose = require("mongoose");
const Inventory = require("../models/Inventory");

// ======================================
// Add Inventory
// ======================================

exports.addInventory = async (req, res) => {

    try {

        const {

            module,
            productName,
            stock,
            minimumStock

        } = req.body;

        // Required Field Validation
        if (
            !module ||
            !productName ||
            stock == null
        ) {

            return res.status(400).json({

                success: false,

                message: "Module, Product Name and Stock are required."

            });

        }

        // Duplicate Check
        const existingInventory = await Inventory.findOne({

            module,

            productName

        });

        if (existingInventory) {

            return res.status(400).json({

                success: false,

                message: "Inventory already exists."

            });

        }

        const inventory = await Inventory.create({

            module,

            productName,

            stock,

            minimumStock,

            lastUpdatedBy: req.user.id

        });

        return res.status(201).json({

            success: true,

            message: "Inventory Added Successfully",

            inventory

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
// Get All Inventory
// ======================================

exports.getAllInventory = async (req, res) => {

    try {

        const inventory = await Inventory.find()

            .populate(
                "lastUpdatedBy",
                "name role"
            )

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            message: "Inventory Retrieved Successfully",

            count: inventory.length,

            inventory

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
// Department Inventory
// ======================================

exports.getDepartmentInventory = async (req, res) => {

    try {

        const inventory = await Inventory.find({

            module: req.user.department

        })

        .populate(
            "lastUpdatedBy",
            "name role"
        )

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            message: "Department Inventory Retrieved Successfully",

            department: req.user.department,

            count: inventory.length,

            inventory

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
// Search Inventory
// Search by Product Name
// ======================================

exports.searchInventory = async (req, res) => {

    try {

        const { product } = req.query;

        if (!product) {

            return res.status(400).json({

                success: false,

                message: "Product name is required."

            });

        }

        const inventory = await Inventory.find({

            productName: {

                $regex: product,

                $options: "i"

            }

        })

        .populate(
            "lastUpdatedBy",
            "name role"
        );

        if (inventory.length === 0) {

            return res.status(404).json({

                success: false,

                message: "No inventory found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Inventory Search Successful",

            count: inventory.length,

            inventory

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
// Filter Inventory By Module
// ======================================

exports.getInventoryByModule = async (req, res) => {

    try {

        const { module } = req.query;

        if (!module) {

            return res.status(400).json({

                success: false,

                message: "Module is required."

            });

        }

        const inventory = await Inventory.find({

            module

        })

        .populate("lastUpdatedBy", "name role")

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            message: "Inventory Retrieved Successfully",

            count: inventory.length,

            inventory

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
// Inventory Pagination
// ======================================

exports.paginateInventory = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalInventory = await Inventory.countDocuments();

        const inventory = await Inventory.find()

            .populate("lastUpdatedBy", "name role")

            .sort({

                createdAt: -1

            })

            .skip(skip)

            .limit(limit);

        return res.status(200).json({

            success: true,

            message: "Inventory Retrieved Successfully",

            currentPage: page,

            totalPages: Math.ceil(totalInventory / limit),

            totalInventory,

            count: inventory.length,

            inventory

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
// Update Inventory
// ======================================

exports.updateInventory = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid Inventory ID."

            });

        }

        const inventory = await Inventory.findByIdAndUpdate(

            id,

            {

                ...req.body,

                lastUpdatedBy: req.user.id

            },

            {

                new: true,

                runValidators: true

            }

        );

        if (!inventory) {

            return res.status(404).json({

                success: false,

                message: "Inventory Not Found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Inventory Updated Successfully",

            inventory

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
// Delete Inventory
// ======================================

exports.deleteInventory = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid Inventory ID."

            });

        }

        const inventory = await Inventory.findByIdAndDelete(id);

        if (!inventory) {

            return res.status(404).json({

                success: false,

                message: "Inventory Not Found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Inventory Deleted Successfully",

            inventory

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
// Low Stock Inventory
// ======================================

exports.getLowStockInventory = async (req, res) => {

    try {

        const inventory = await Inventory.find({

            $expr: {

                $lte: [

                    "$stock",

                    "$minimumStock"

                ]

            }

        })

        .populate("lastUpdatedBy", "name role")

        .sort({

            stock: 1

        });

        return res.status(200).json({

            success: true,

            message: "Low Stock Inventory Retrieved Successfully",

            count: inventory.length,

            inventory

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
// Low Stock Count
// ======================================

exports.getLowStockCount = async (req, res) => {

    try {

        const count = await Inventory.countDocuments({

            $expr: {

                $lte: [

                    "$stock",

                    "$minimumStock"

                ]

            }

        });

        return res.status(200).json({

            success: true,

            message: "Low Stock Count Retrieved Successfully",

            lowStockCount: count

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};