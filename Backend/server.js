// ======================================
// Campora Backend Server
// ======================================

// Import Required Packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load Environment Variables
dotenv.config();

// Import Database Connection
const connectDB = require("./config/db");

// Connect Database
connectDB();

// ======================================
// Route Imports
// ======================================

const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const snackRoutes = require("./routes/snackRoutes");
const stationeryRoutes = require("./routes/stationeryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const printRoutes = require("./routes/printRoutes");

const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const inventoryRoutes = require("./routes/inventoryRoutes");

const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes = require("./routes/reportRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

// ======================================
// Create Express App
// ======================================

const app = express();

// ======================================
// Middleware
// ======================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ======================================
// Static Folder for Uploaded Files
// ======================================

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// ======================================
// Default Route
// ======================================

app.get("/", (req, res) => {

    return res.status(200).json({

        success: true,

        message: "🚀 Campora Backend Running Successfully!"

    });

});

// ======================================
// API Routes
// ======================================

// User
app.use("/api/users", userRoutes);

// Food
app.use("/api/food", foodRoutes);

// Snacks
app.use("/api/snacks", snackRoutes);

// Stationery
app.use("/api/stationery", stationeryRoutes);

// Books
app.use("/api/books", bookRoutes);

// Print
app.use("/api/print", printRoutes);

// Orders
app.use("/api/orders", orderRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Inventory
app.use("/api/inventory", inventoryRoutes);

// Notifications
app.use("/api/notifications", notificationRoutes);

// Reports
app.use("/api/reports", reportRoutes);

// Uploads
app.use("/api/uploads", uploadRoutes);

// ======================================
// 404 Route Handler
// ======================================

app.use((req, res) => {

    return res.status(404).json({

        success: false,

        message: "API Route Not Found"

    });

});

// ======================================
// Global Error Handler
// ======================================

app.use((err, req, res, next) => {

    console.error(err.stack);

    return res.status(err.status || 500).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

});

// ======================================
// Start Server
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("=====================================");
    console.log("🚀 Campora Backend Started");
    console.log(`🌐 Server : http://localhost:${PORT}`);
    console.log("📁 Uploads : http://localhost:" + PORT + "/uploads");
    console.log("=====================================");

});