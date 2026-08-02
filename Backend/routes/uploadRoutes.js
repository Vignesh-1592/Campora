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
    authorizeRoles(
        "superadmin",
        "departmentadmin"
    ),
    allowDepartment(
        "Food",
        "Snacks",
        "Stationery",
        "Book Depot"
    ),
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
// Super Administrator + Department Administrator
// ======================================

router.get(
    "/product-images",
    verifyToken,
    authorizeRoles(
        "superadmin",
        "departmentadmin"
    ),
    getProductImages
);

// ======================================
// View Print Documents
// Super Administrator + Print Department Administrator
// ======================================

router.get(
    "/documents",
    verifyToken,
    authorizeRoles(
        "superadmin",
        "departmentadmin"
    ),
    allowDepartment("Print Centre"),
    getDocuments
);

// ======================================
// Delete Uploaded File
// products OR documents
// ======================================

router.delete(
    "/:folder/:filename",
    verifyToken,
    authorizeRoles(
        "superadmin",
        "departmentadmin"
    ),
    deleteFile
);

module.exports = router;