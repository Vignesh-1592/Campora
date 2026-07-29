const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Common Fields
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
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Student Only
    rollNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    year: {
      type: String,
      enum: ["I", "II", "III", "IV"],
    },

    // Department
    department: {
      type: String,
      required: true,
    },

    // Staff Only
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Admin Only
    adminId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // User Role
    role: {
      type: String,
      enum: ["student", "staff", "admin", "superadmin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);