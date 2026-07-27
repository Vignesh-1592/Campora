const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// Register User
// ===============================
exports.registerUser = async (req, res) => {
    try {

        const { name, registerNumber, email, phone, password, role } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash password
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

        await user.save();

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

// ===============================
// Login User
// ===============================
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Login Success Response
        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                registerNumber: user.registerNumber,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ===============================
// Get User Profile
// ===============================
exports.getUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        return res.status(200).json(user);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};