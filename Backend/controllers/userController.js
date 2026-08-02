const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// ======================================
// Register User
// ======================================

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

        // ======================================
        // Required Fields Validation
        // ======================================

        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !role
        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        // Email Validation

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            return res.status(400).json({

                success: false,

                message: "Invalid email format."

            });

        }

        // Password Validation

if (password.length < 6) {

    return res.status(400).json({

        success: false,

        message: "Password must contain at least 6 characters."

    });

}

// ======================================
// Role Specific Validation
// ======================================

// Student
if (role === "student" && !rollNumber) {

    return res.status(400).json({

        success: false,

        message: "Roll Number is required."

    });

}

// Department Administrator
if (role === "departmentadmin" && !employeeId) {

    return res.status(400).json({

        success: false,

        message: "Employee ID is required."

    });

}

// Super Administrator
if (role === "superadmin" && !adminId) {

    return res.status(400).json({

        success: false,

        message: "Admin ID is required."

    });

}


        // ======================================
        // Duplicate Checks
        // ======================================

        const existingEmail = await User.findOne({

            email

        });

        if (existingEmail) {

            return res.status(400).json({

                success: false,

                message: "Email already exists."

            });

        }

        if (rollNumber) {

            const existingRoll = await User.findOne({

                rollNumber

            });

            if (existingRoll) {

                return res.status(400).json({

                    success: false,

                    message: "Roll Number already exists."

                });

            }

        }

        if (employeeId) {

            const existingEmployee = await User.findOne({

                employeeId

            });

            if (existingEmployee) {

                return res.status(400).json({

                    success: false,

                    message: "Employee ID already exists."

                });

            }

        }

        if (adminId) {

            const existingAdmin = await User.findOne({

                adminId

            });

            if (existingAdmin) {

                return res.status(400).json({

                    success: false,

                    message: "Admin ID already exists."

                });

            }

        }

        // ======================================
        // Department Validation
        // ======================================

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

        if (

            role === "student" &&

            !studentDepartments.includes(department)

        ) {

            return res.status(400).json({

                success: false,

                message: "Students must belong to an academic department."

            });

        }

        if (

            role === "departmentadmin" &&

            !serviceDepartments.includes(department)

        ) {

            return res.status(400).json({

                success: false,

                message: "Department Administrator must belong to a service department."

            });

        }

        if (

            role === "superadmin" &&

            department !== "Administration"

        ) {

            return res.status(400).json({

                success: false,

                message: "Super Administrator department must be Administration."

            });

        }

        // ======================================
        // Password Hashing
        // ======================================

        const hashedPassword = await bcrypt.hash(

            password,

            10

        );

        // ======================================
        // Create User
        // ======================================

        const user = await User.create({

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

        return res.status(201).json({

            success: true,

            message: "User Registered Successfully",

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                department: user.department

            }

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
// Login User
// ======================================

exports.loginUser = async (req, res) => {

    try {

        const {

            campusId,

            password

        } = req.body;

        if (!campusId || !password) {

            return res.status(400).json({

                success: false,

                message: "Campus ID and Password are required."

            });

        }

        const user = await User.findOne({

            $or: [

                { rollNumber: campusId },

                { employeeId: campusId },

                { adminId: campusId }

            ]

        });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User Not Found."

            });

        }

        if (!user.isActive) {

            return res.status(403).json({

                success: false,

                message: "Your account has been deactivated."

            });

        }

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid Password."

            });

        }

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

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                role: user.role,
                department: user.department,
                email: user.email,
                phone: user.phone,
                rollNumber: user.rollNumber,
                employeeId: user.employeeId,
                adminId: user.adminId

            }

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
// Get User Profile
// ======================================

exports.getUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)

            .select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User Not Found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Profile Retrieved Successfully",

            user

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
// Update User Profile
// ======================================

exports.updateUserProfile = async (req, res) => {

    try {

        const { id } = req.user;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid User ID."

            });

        }

        const {

            name,
            email,
            phone,
            department,
            year

        } = req.body;

        const user = await User.findById(id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User Not Found."

            });

        }

        // Email Duplicate Check

        if (email && email !== user.email) {

            const existingEmail = await User.findOne({ email });

            if (existingEmail) {

                return res.status(400).json({

                    success: false,

                    message: "Email already exists."

                });

            }

        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.department = department || user.department;
        user.year = year || user.year;

        await user.save();

        return res.status(200).json({

            success: true,

            message: "Profile Updated Successfully",

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                department: user.department,
                year: user.year,
                role: user.role

            }

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
// Change Password
// ======================================

exports.changePassword = async (req, res) => {

    try {

        const {

            currentPassword,
            newPassword

        } = req.body;

        // Validate Required Fields
        if (!currentPassword || !newPassword) {

            return res.status(400).json({

                success: false,

                message: "Current Password and New Password are required."

            });

        }

        // Find User
        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User Not Found."

            });

        }

        // Verify Current Password
        const isMatch = await bcrypt.compare(

            currentPassword,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Current Password is incorrect."

            });

        }

        // New Password Length Validation
        if (newPassword.length < 6) {

            return res.status(400).json({

                success: false,

                message: "New Password must contain at least 6 characters."

            });

        }

        // Prevent Same Password
        if (currentPassword === newPassword) {

            return res.status(400).json({

                success: false,

                message: "New Password cannot be the same as the current password."

            });

        }

        // Encrypt New Password
        user.password = await bcrypt.hash(

            newPassword,

            10

        );

        await user.save();

        return res.status(200).json({

            success: true,

            message: "Password Changed Successfully."

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
// Get All Users
// Super Administrator
// ======================================

exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find()

            .select("-password")

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            message: "Users Retrieved Successfully",

            count: users.length,

            users

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
// Activate / Deactivate User
// Super Administrator
// ======================================

exports.updateUserStatus = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid User ID."

            });

        }

        const user = await User.findById(id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User Not Found."

            });

        }

        user.isActive = !user.isActive;

        await user.save();

        return res.status(200).json({

            success: true,

            message: `User ${user.isActive ? "Activated" : "Deactivated"} Successfully`,

            user: {

                id: user._id,
                name: user.name,
                role: user.role,
                isActive: user.isActive

            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};