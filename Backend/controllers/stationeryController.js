const StationeryItem = require("../models/StationeryItem");

// ===============================
// Add Stationery Item
// ===============================
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

        const item = new StationeryItem({
            name,
            description,
            category,
            price,
            image,
            available,
            stock,
        });

        await item.save();

        return res.status(201).json({
            message: "Stationery Item Added Successfully",
            item,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Get All Stationery Items
// ===============================
exports.getAllStationeryItems = async (req, res) => {

    try {

        const items = await StationeryItem.find();

        return res.status(200).json({
            message: "Stationery Items Retrieved Successfully",
            count: items.length,
            items,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Update Stationery Item
// ===============================
exports.updateStationeryItem = async (req, res) => {

    try {

        const { id } = req.params;

        const updatedItem = await StationeryItem.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: "Stationery Item Not Found"
            });
        }

        return res.status(200).json({
            message: "Stationery Item Updated Successfully",
            item: updatedItem,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Delete Stationery Item
// ===============================
exports.deleteStationeryItem = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedItem = await StationeryItem.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({
                message: "Stationery Item Not Found"
            });
        }

        return res.status(200).json({
            message: "Stationery Item Deleted Successfully",
            item: deletedItem,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};