// Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import database connection
const connectDB = require("./config/db");

// Import routes
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const stationeryRoutes = require("./routes/stationeryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const printRoutes = require("./routes/printRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const orderRoutes = require("./routes/orderRoutes");
const snackRoutes = require("./routes/snackRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express application
const app = express();

// Middleware
app.use(cors());             // Allow requests from frontend
app.use(express.json());     // Read JSON data from request body

// Default Route
app.get("/", (req, res) => {
    res.send("🚀 Campora Backend Running Successfully!");
});

// ===============================
// Routes
// ===============================

// User Routes
app.use("/api/users", userRoutes);

// Food Routes
app.use("/api/food", foodRoutes);

// Stationery Routes
app.use("/api/stationery", stationeryRoutes);

// Book Routes
app.use("/api/books", bookRoutes);

// Print Routes
app.use("/api/print", printRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/snacks", snackRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/products", productRoutes);

app.use("/api/inventory", inventoryRoutes);
// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});