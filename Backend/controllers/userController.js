const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register User
exports.registerUser = async (req, res) => {
    try {

        // Get data from request body
        const { name, registerNumber, email, phone, password, role } = req.body;

        // Check whether email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            registerNumber,
            email,
            phone,
            password: hashedPassword,
            role,
        });

        // Save user
        await user.save();

        // Success response
        return res.status(201).json({
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};