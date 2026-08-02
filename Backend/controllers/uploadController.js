const fs = require("fs");
const path = require("path");

// ======================================
// Upload Product Image
// ======================================

exports.uploadProductImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No image uploaded."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Product Image Uploaded Successfully",

            filename: req.file.filename,

            path: req.file.path

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

// ======================================
// Upload Print Document
// ======================================

exports.uploadDocument = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No document uploaded."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Document Uploaded Successfully",

            filename: req.file.filename,

            path: req.file.path

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

// ======================================
// View Uploaded Product Images
// ======================================

exports.getProductImages = async (req, res) => {

    try {

        const folderPath = path.join(

            __dirname,

            "..",

            "uploads",

            "products"

        );

        const files = fs.readdirSync(folderPath);

        return res.status(200).json({

            success: true,

            message: "Product Images Retrieved Successfully",

            count: files.length,

            files

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

// ======================================
// View Uploaded Documents
// ======================================

exports.getDocuments = async (req, res) => {

    try {

        const folderPath = path.join(

            __dirname,

            "..",

            "uploads",

            "documents"

        );

        const files = fs.readdirSync(folderPath);

        return res.status(200).json({

            success: true,

            message: "Documents Retrieved Successfully",

            count: files.length,

            files

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

// ======================================
// Delete Uploaded File
// ======================================

exports.deleteFile = async (req, res) => {

    try {

        const { folder, filename } = req.params;

        // Allow only valid folders

        if (

            folder !== "products" &&

            folder !== "documents"

        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid folder."

            });

        }

        const filePath = path.join(

            __dirname,

            "..",

            "uploads",

            folder,

            filename

        );

        if (!fs.existsSync(filePath)) {

            return res.status(404).json({

                success: false,

                message: "File Not Found."

            });

        }

        fs.unlinkSync(filePath);

        return res.status(200).json({

            success: true,

            message: "File Deleted Successfully."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};