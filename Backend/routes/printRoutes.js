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
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Add Print Request
// Student Only
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("student"),
    addPrintRequest
);

// ======================================
// Get All Print Requests
// Super Administrator + Print Department Administrator
// ======================================

router.get(
    "/",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    getAllPrintRequests
);

// ======================================
// Update Print Request
// Super Administrator + Print Department Administrator
// ======================================

router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    updatePrintRequest
);

// ======================================
// Delete Print Request
// Super Administrator + Print Department Administrator
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    deletePrintRequest
);

// ======================================
// Print Document
// Super Administrator + Print Department Administrator
// ======================================

router.put(
    "/print/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    printDocument
);

module.exports = router;