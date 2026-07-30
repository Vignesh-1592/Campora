const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// Register User
// ===============================
exports.registerUser = async (req, res) => {

    try {

        const {
            name,
            rollNumber,
            employeeId,
            adminId,
            department,
            year,
            email,
            phone,
            password,
            role
        } = req.body;

        // Check if email already exists
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Check Roll Number
        if (rollNumber) {
            const existingRoll = await User.findOne({ rollNumber });

            if (existingRoll) {
                return res.status(400).json({
                    message: "Roll Number already exists"
                });
            }
        }

        // Check Employee ID
        if (employeeId) {
            const existingEmployee = await User.findOne({ employeeId });

            if (existingEmployee) {
                return res.status(400).json({
                    message: "Employee ID already exists"
                });
            }
        }

        // Check Admin ID
        if (adminId) {
            const existingAdmin = await User.findOne({ adminId });

            if (existingAdmin) {
                return res.status(400).json({
                    message: "Admin ID already exists"
                });
            }
        }

        // ===============================
        // Department Validation
        // ===============================

        const studentDepartments = [
            "CSE",
            "ECE",
            "EEE",
            "MECH",
            "CIVIL",
            "AIDS",
            "AIML",
            "IT"
        ];

        const serviceDepartments = [
            "Food",
            "Snacks",
            "Stationery",
            "Book Depot",
            "Print Centre"
        ];

        // Student Validation
        if (role === "student" && !studentDepartments.includes(department)) {
            return res.status(400).json({
                message: "Students must belong to an academic department."
            });
        }

        // Staff Validation
        if (role === "staff" && !serviceDepartments.includes(department)) {
            return res.status(400).json({
                message: "Staff must belong to a service department."
            });
        }

        // Admin Validation
        if (role === "admin" && department !== "Administration") {
            return res.status(400).json({
                message: "Admin department must be Administration."
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({
            name,
            rollNumber,
            employeeId,
            adminId,
            department,
            year,
            email,
            phone,
            password: hashedPassword,
            role
        });

        await user.save();

        return res.status(201).json({
            message: "User Registered Successfully",
            user
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

        const { campusId, password } = req.body;

        // Find User
        const user = await User.findOne({
            $or: [
                { rollNumber: campusId },
                { employeeId: campusId },
                { adminId: campusId }
            ]
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare Password
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
                name: user.name,
                role: user.role,
                department: user.department,
                rollNumber: user.rollNumber,
                employeeId: user.employeeId,
                adminId: user.adminId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                rollNumber: user.rollNumber,
                employeeId: user.employeeId,
                adminId: user.adminId,
                department: user.department,
                year: user.year,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
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

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile Retrieved Successfully",
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                rollNumber: user.rollNumber,
                employeeId: user.employeeId,
                adminId: user.adminId,
                department: user.department,
                year: user.year,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};