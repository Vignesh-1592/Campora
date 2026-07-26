const mongoose = require("mongoose"); //This imports Mongoose so we can create schemas and interact with MongoDB.

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    registerNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
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

    role: {
      type: String,
      enum: ["student", "admin","faculty","HOD","principal","admin","superadmin","examcell",],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);