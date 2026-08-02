const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ======================================
// Create Upload Folders Automatically
// ======================================

const productFolder = path.join(__dirname, "..", "uploads", "products");
const documentFolder = path.join(__dirname, "..", "uploads", "documents");

if (!fs.existsSync(productFolder)) {
    fs.mkdirSync(productFolder, { recursive: true });
}

if (!fs.existsSync(documentFolder)) {
    fs.mkdirSync(documentFolder, { recursive: true });
}

// ======================================
// Product Image Storage
// ======================================

const productStorage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, productFolder);

    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname.replace(/\s+/g, "_");

        cb(null, uniqueName);

    }

});

// ======================================
// Print Document Storage
// ======================================

const documentStorage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, documentFolder);

    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname.replace(/\s+/g, "_");

        cb(null, uniqueName);

    }

});

// ======================================
// Image Filter
// ======================================

const imageFilter = (req, file, cb) => {

    const allowedExtensions = [

        ".jpg",
        ".jpeg",
        ".png",
        ".webp"

    ];

    const extension = path
        .extname(file.originalname)
        .toLowerCase();

    if (allowedExtensions.includes(extension)) {

        cb(null, true);

    } else {

        cb(new Error(
            "Only JPG, JPEG, PNG and WEBP files are allowed."
        ));

    }

};

// ======================================
// Document Filter
// ======================================

const documentFilter = (req, file, cb) => {

    const allowedExtensions = [

        ".pdf",
        ".doc",
        ".docx"

    ];

    const extension = path
        .extname(file.originalname)
        .toLowerCase();

    if (allowedExtensions.includes(extension)) {

        cb(null, true);

    } else {

        cb(new Error(
            "Only PDF, DOC and DOCX files are allowed."
        ));

    }

};

// ======================================
// Product Image Upload
// ======================================

const uploadProductImage = multer({

    storage: productStorage,

    fileFilter: imageFilter,

    limits: {

        fileSize: 5 * 1024 * 1024 // 5 MB

    }

});

// ======================================
// Print Document Upload
// ======================================

const uploadDocument = multer({

    storage: documentStorage,

    fileFilter: documentFilter,

    limits: {

        fileSize: 10 * 1024 * 1024 // 10 MB

    }

});

// ======================================
// Export
// ======================================

module.exports = {

    uploadProductImage,

    uploadDocument

};