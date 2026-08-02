const mongoose = require("mongoose");
const Print = require("../models/Print");
const Notification = require("../models/Notification");

// ======================================
// Add Print Request
// Student
// ======================================
exports.addPrintRequest = async (req, res) => {

    try {

        const {
            documentName,
            file,
            printType,
            colorPages,
            printingSide,
            paperSize,
            orientation,
            pageRange,
            copies,
            binding,
            price
        } = req.body;

        // Required Field Validation
        if (!documentName || !printType || !copies || price == null) {

            return res.status(400).json({
                success: false,
                message: "Document Name, Print Type, Copies and Price are required."
            });

        }

        const printRequest = await Print.create({

            documentName,
            file,
            printType,
            colorPages,
            printingSide,
            paperSize,
            orientation,
            pageRange,
            copies,
            binding,
            price,
            user: req.user.id

        });

        return res.status(201).json({

            success: true,
            message: "Print Request Submitted Successfully",
            printRequest

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
// Get My Print Requests
// Student
// ======================================
exports.getMyPrintRequests = async (req, res) => {

    try {

        const printRequests = await Print.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,
            message: "My Print Requests Retrieved Successfully",
            count: printRequests.length,
            printRequests

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
// Get All Print Requests
// Admin
// ======================================
exports.getAllPrintRequests = async (req, res) => {

    try {

        const printRequests = await Print.find()

            .populate("user", "name rollNumber department")

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,
            message: "Print Requests Retrieved Successfully",
            count: printRequests.length,
            printRequests

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
// Search Print Request
// Search by Document Name
// ======================================
exports.searchPrintRequest = async (req, res) => {

    try {

        const { document } = req.query;

        if (!document) {

            return res.status(400).json({

                success: false,
                message: "Document name is required."

            });

        }

        const printRequests = await Print.find({

            documentName: {

                $regex: document,
                $options: "i"

            }

        }).populate("user", "name rollNumber");

        if (printRequests.length === 0) {

            return res.status(404).json({

                success: false,
                message: "No print requests found."

            });

        }

        return res.status(200).json({

            success: true,
            message: "Print Search Successful",
            count: printRequests.length,
            printRequests

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
// Filter Print Requests By Status
// ======================================
exports.getPrintRequestsByStatus = async (req, res) => {

    try {

        const { status } = req.query;

        if (!status) {

            return res.status(400).json({
                success: false,
                message: "Status is required."
            });

        }

        const printRequests = await Print.find({
            status
        }).populate("user", "name rollNumber department");

        if (printRequests.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No print requests found."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Print Requests Retrieved Successfully",
            count: printRequests.length,
            printRequests
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
// Update Print Request
// ======================================
exports.updatePrintRequest = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Print Request ID."
            });

        }

        const printRequest = await Print.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!printRequest) {

            return res.status(404).json({
                success: false,
                message: "Print Request Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Print Request Updated Successfully",
            printRequest
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
// Delete Print Request
// ======================================
exports.deletePrintRequest = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Print Request ID."
            });

        }

        const printRequest = await Print.findByIdAndDelete(id);

        if (!printRequest) {

            return res.status(404).json({
                success: false,
                message: "Print Request Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Print Request Deleted Successfully",
            printRequest
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
// Print Document
// Staff Prints Document
// ======================================
exports.printDocument = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Print Request ID."
            });

        }

        const printRequest = await Print.findById(id);

        if (!printRequest) {

            return res.status(404).json({
                success: false,
                message: "Print Request Not Found"
            });

        }

        // Update Status
        printRequest.status = "Ready for Pickup";

        await printRequest.save();

        // Create Notification
        const notification = await Notification.create({

            user: printRequest.user,

            title: "Print Ready",

            message: `${printRequest.documentName} is ready for pickup.`

        });

        return res.status(200).json({

            success: true,
            message: "Document Printed Successfully",
            printRequest,
            notification

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};