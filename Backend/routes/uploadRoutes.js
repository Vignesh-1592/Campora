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

// ======================================
// Upload Product Image
// ======================================

router.post(
    "/product-image",
    verifyToken,
    authorizeRoles("admin", "staff"),
    uploadImage.single("image"),
    uploadProductImage
);

// ======================================
// Upload Print Document
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
// ======================================

router.get(
    "/product-images",
    verifyToken,
    getProductImages
);

// ======================================
// View Documents
// ======================================

router.get(
    "/documents",
    verifyToken,
    getDocuments
);

// ======================================
// Delete File
// ======================================

router.delete(
    "/:folder/:filename",
    verifyToken,
    authorizeRoles("admin", "staff"),
    deleteFile
);

module.exports = router;