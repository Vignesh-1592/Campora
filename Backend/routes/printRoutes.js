const express = require("express");
const router = express.Router();

const {

    addPrintRequest,
    getMyPrintRequests,
    getAllPrintRequests,
    searchPrintRequest,
    getPrintRequestsByStatus,
    updatePrintRequest,
    deletePrintRequest,
    printDocument

} = require("../controllers/printController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Student Routes
// ======================================

// Submit Print Request
router.post(
    "/add",
    verifyToken,
    authorizeRoles("student"),
    addPrintRequest
);

// View My Print Requests
router.get(
    "/my",
    verifyToken,
    authorizeRoles("student"),
    getMyPrintRequests
);

// ======================================
// Print Department & Super Admin
// ======================================

// Get All Print Requests
router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    getAllPrintRequests
);

// Search Print Request
router.get(
    "/search",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    searchPrintRequest
);

// Filter Print Requests By Status
router.get(
    "/status",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    getPrintRequestsByStatus
);

// Update Print Request
router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    updatePrintRequest
);

// Print Document
router.put(
    "/print/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    printDocument
);

// Delete Print Request
router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    deletePrintRequest
);

module.exports = router;