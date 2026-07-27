const Food = require("../models/Food");

// ===============================
// Add Food
// ===============================
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

        const food = new Food({
            name,
            description,
            category,
            price,
            image,
            available,
            department,
        });

        await food.save();

        return res.status(201).json({
            message: "Food Added Successfully",
            food,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ===============================
// Get All Food
// ===============================
exports.getAllFood = async (req, res) => {

    try {

        // Fetch all food items from MongoDB
        const foods = await Food.find();

        return res.status(200).json({
            message: "Food Items Retrieved Successfully",
            count: foods.length,
            foods,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Update Food
// ===============================
exports.updateFood = async (req, res) => {

    try {

        const { id } = req.params;

        const updatedFood = await Food.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedFood) {
            return res.status(404).json({
                message: "Food Item Not Found",
            });
        }

        return res.status(200).json({
            message: "Food Updated Successfully",
            food: updatedFood,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};
// ===============================
// Delete Food
// ===============================
exports.deleteFood = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedFood = await Food.findByIdAndDelete(id);

        if (!deletedFood) {
            return res.status(404).json({
                message: "Food Item Not Found"
            });
        }

        return res.status(200).json({
            message: "Food Deleted Successfully",
            food: deletedFood
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};