const Snack = require("../models/Snack");

// ===============================
// Add Snack
// ===============================
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

        const snack = new Snack({
            name,
            brand,
            category,
            description,
            price,
            image,
            available,
            stock
        });

        await snack.save();

        return res.status(201).json({
            message: "Snack Added Successfully",
            snack
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ===============================
// Get All Snacks
// ===============================
exports.getAllSnacks = async (req, res) => {

    try {

        const snacks = await Snack.find();

        return res.status(200).json({
            message: "Snacks Retrieved Successfully",
            count: snacks.length,
            snacks
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ===============================
// Update Snack
// ===============================
exports.updateSnack = async (req, res) => {

    try {

        const snack = await Snack.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!snack) {

            return res.status(404).json({
                message: "Snack Not Found"
            });

        }

        return res.status(200).json({
            message: "Snack Updated Successfully",
            snack
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ===============================
// Delete Snack
// ===============================
exports.deleteSnack = async (req, res) => {

    try {

        const snack = await Snack.findByIdAndDelete(req.params.id);

        if (!snack) {

            return res.status(404).json({
                message: "Snack Not Found"
            });

        }

        return res.status(200).json({
            message: "Snack Deleted Successfully",
            snack
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};