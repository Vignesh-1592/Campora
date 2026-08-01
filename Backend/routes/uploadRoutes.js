const express = require("express");
const router = express.Router();

const {

    uploadProductImage,
    uploadDocument,
    getProductImages,
    getDocuments,
    deleteFile

} = require("../controllers/uploadController");

const {

    uploadProductImage: uploadImage,
    uploadDocument: uploadDoc

} = require("../middleware/uploadMiddleware");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Upload Product Image
// Super Administrator + Department Administrator
// ======================================

router.post(
    "/product-image",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    uploadImage.single("image"),
    uploadProductImage
);

// ======================================
// Upload Print Document
// Student Only
// ======================================

router.post(
    "/document",
    verifyToken,
    authorizeRoles("student"),
    uploadDoc.single("document"),
    uploadDocument
);

// ======================================
// View Product Images
// All Logged-in Users
// ======================================

router.get(
    "/product-images",
    verifyToken,
    getProductImages
);

// ======================================
// View Print Documents
// Super Administrator + Print Department Administrator
// ======================================

router.get(
    "/documents",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    getDocuments
);

// ======================================
// Delete Product Image
// Super Administrator + Department Administrator
// ======================================

router.delete(
    "/products/:filename",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    deleteFile
);

// ======================================
// Delete Print Document
// Super Administrator + Print Department Administrator
// ======================================

router.delete(
    "/documents/:filename",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Print Centre"),
    deleteFile
);

module.exports = router;