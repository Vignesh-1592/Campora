const multer = require("multer");
const path = require("path");

// ======================================
// Product Image Storage
// ======================================

const productStorage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/products");

    },

    filename: function (req, file, cb) {

        cb(null, Date.now() + "-" + file.originalname);

    }

});

// ======================================
// Print Document Storage
// ======================================

const documentStorage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/documents");

    },

    filename: function (req, file, cb) {

        cb(null, Date.now() + "-" + file.originalname);

    }

});

// ======================================
// Image Filter
// ======================================

const imageFilter = (req, file, cb) => {

    const allowedExtensions = [".jpg", ".jpeg", ".png"];

    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {

        cb(null, true);

    } else {

        cb(new Error("Only JPG, JPEG and PNG files are allowed."));

    }

};

// ======================================
// Document Filter
// ======================================

const documentFilter = (req, file, cb) => {

    const allowedExtensions = [".pdf", ".doc", ".docx"];

    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {

        cb(null, true);

    } else {

        cb(new Error("Only PDF, DOC and DOCX files are allowed."));

    }

};

// ======================================
// Upload Objects
// ======================================

const uploadProductImage = multer({

    storage: productStorage,

    fileFilter: imageFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});

const uploadDocument = multer({

    storage: documentStorage,

    fileFilter: documentFilter,

    limits: {

        fileSize: 10 * 1024 * 1024

    }

});

module.exports = {

    uploadProductImage,

    uploadDocument

};