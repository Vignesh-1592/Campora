const Food = require("../models/Food");

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