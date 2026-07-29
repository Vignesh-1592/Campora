const express = require("express");
const router = express.Router();

const {
    addPrintRequest,
    getAllPrintRequests,
    updatePrintRequest,
    deletePrintRequest,
    printDocument
} = require("../controllers/printController");

const verifyToken = require("../middleware/authMiddleware");

// ===============================
// Add Print Request
// ===============================
router.post("/add", verifyToken, addPrintRequest);

// ===============================
// Get All Print Requests
// ===============================
router.get("/", verifyToken, getAllPrintRequests);

// ===============================
// Update Print Request
// ===============================
router.put("/update/:id", verifyToken, updatePrintRequest);

// ===============================
// Delete Print Request
// ===============================
router.delete("/delete/:id", verifyToken, deletePrintRequest);

// ===============================
// Staff Prints Document
// ===============================
router.put("/print/:id", verifyToken, printDocument);

module.exports = router;