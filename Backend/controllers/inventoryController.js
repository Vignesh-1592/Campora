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

        const existingInventory = await Inventory.findOne({
            module,
            productName
        });

        if (existingInventory) {
            return res.status(400).json({
                message: "Inventory already exists"
            });
        }

        const inventory = new Inventory({

            module,
            productName,
            stock,
            minimumStock,
            lastUpdatedBy: req.user.id

        });

        await inventory.save();

        return res.status(201).json({

            message: "Inventory Added Successfully",

            inventory

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
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
            .populate("lastUpdatedBy", "name role")
            .sort({ createdAt: -1 });

        return res.status(200).json({

            message: "Inventory Retrieved Successfully",

            count: inventory.length,

            inventory

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Get Inventory By Department
// ======================================

exports.getDepartmentInventory = async (req, res) => {

    try {

        const inventory = await Inventory.find({

            module: req.user.department

        })
        .populate("lastUpdatedBy", "name role")
        .sort({ createdAt: -1 });

        return res.status(200).json({

            message: "Department Inventory Retrieved Successfully",

            department: req.user.department,

            count: inventory.length,

            inventory

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Update Inventory
// ======================================

exports.updateInventory = async (req, res) => {

    try {

        const inventory = await Inventory.findById(req.params.id);

        if (!inventory) {

            return res.status(404).json({

                message: "Inventory Not Found"

            });

        }

        inventory.module = req.body.module || inventory.module;
        inventory.productName = req.body.productName || inventory.productName;

        inventory.stock =
            req.body.stock !== undefined
                ? req.body.stock
                : inventory.stock;

        inventory.minimumStock =
            req.body.minimumStock !== undefined
                ? req.body.minimumStock
                : inventory.minimumStock;

        inventory.lastUpdatedBy = req.user.id;

        await inventory.save();

        return res.status(200).json({

            message: "Inventory Updated Successfully",

            inventory

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Delete Inventory
// ======================================

exports.deleteInventory = async (req, res) => {

    try {

        const inventory = await Inventory.findByIdAndDelete(req.params.id);

        if (!inventory) {

            return res.status(404).json({

                message: "Inventory Not Found"

            });

        }

        return res.status(200).json({

            message: "Inventory Deleted Successfully",

            inventory

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Low Stock Inventory
// ======================================

exports.getLowStockInventory = async (req, res) => {

    try {

        const inventory = await Inventory.find();

        const lowStock = inventory.filter(item =>

            item.stock <= item.minimumStock

        );

        return res.status(200).json({

            message: "Low Stock Inventory Retrieved Successfully",

            count: lowStock.length,

            inventory: lowStock

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};