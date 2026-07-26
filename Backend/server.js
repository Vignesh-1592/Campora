// Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import database connection
const connectDB = require("./config/db");

// Import user routes
const userRoutes = require("./routes/userRoutes");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express application
const app = express();

// Middleware
app.use(cors());              // Allow requests from frontend
app.use(express.json());      // Read JSON data from request body

// Default Route
app.get("/", (req, res) => {
    res.send("🚀 Campora Backend Running Successfully!");
});

// User Routes
app.use("/api/users", userRoutes);

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});