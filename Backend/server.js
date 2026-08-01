// ======================================
// Campora Backend Server
// ======================================

// Import Required Packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

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

const productRoutes = require("./routes/productRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes = require("./routes/reportRoutes");

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
// Default Route
// ======================================

app.get("/", (req, res) => {

    res.send("🚀 Campora Backend Running Successfully!");

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

// Products
app.use("/api/products", productRoutes);

// Inventory
app.use("/api/inventory", inventoryRoutes);

// Notifications
app.use("/api/notifications", notificationRoutes);

// Reports & Analytics
app.use("/api/reports", reportRoutes);

// ======================================
// Start Server
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server Running on http://localhost:${PORT}`);

});