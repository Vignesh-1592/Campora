const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    // ======================================
    // Common Fields
    // ======================================

    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    // ======================================
    // Student
    // ======================================

    rollNumber: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },

    year: {
        type: String,
        enum: ["I", "II", "III", "IV"],
    },

    // ======================================
    // Department
    // ======================================

    department: {
        type: String,
        enum: [
            "Food",
            "Snacks",
            "Stationery",
            "Book Depot",
            "Print Centre",
            "Administration",
            "CSE",
            "ECE",
            "EEE",
            "MECH",
            "CIVIL",
            "AIDS",
            "AIML",
            "IT"
        ],
        default: "CSE"
    },

    // ======================================
    // Department Administrator
    // ======================================

    employeeId: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },

    // ======================================
    // Super Administrator
    // ======================================

    adminId: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },

    // ======================================
    // User Role
    // ======================================

    role: {
        type: String,
        enum: [
            "student",
            "departmentadmin",
            "superadmin"
        ],
        default: "student",
    },

    // ======================================
    // Account Status
    // ======================================

    isActive: {
        type: Boolean,
        default: true,
    }

},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);