const Print = require("../models/Print");
const Notification = require("../models/Notification");

// ===============================
// Add Print Request
// ===============================
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

        const printRequest = new Print({
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

        await printRequest.save();

        return res.status(201).json({
            message: "Print Request Submitted Successfully",
            printRequest
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Get All Print Requests
// ===============================
exports.getAllPrintRequests = async (req, res) => {

    try {

        const printRequests = await Print.find();

        return res.status(200).json({
            message: "Print Requests Retrieved Successfully",
            count: printRequests.length,
            printRequests,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Update Print Request
// ===============================
exports.updatePrintRequest = async (req, res) => {

    try {

        const printRequest = await Print.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!printRequest) {
            return res.status(404).json({
                message: "Print Request Not Found"
            });
        }

        return res.status(200).json({
            message: "Print Request Updated Successfully",
            printRequest,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Delete Print Request
// ===============================
exports.deletePrintRequest = async (req, res) => {

    try {

        const printRequest = await Print.findByIdAndDelete(req.params.id);

        if (!printRequest) {
            return res.status(404).json({
                message: "Print Request Not Found"
            });
        }

        return res.status(200).json({
            message: "Print Request Deleted Successfully",
            printRequest,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ===============================
// Staff Prints Document
// ===============================
exports.printDocument = async (req, res) => {

    try {

        const printRequest = await Print.findById(req.params.id);

        if (!printRequest) {
            return res.status(404).json({
                message: "Print Request Not Found"
            });
        }

        // Update Status
        printRequest.status = "Ready for Pickup";

        await printRequest.save();

        // Create Notification
        const notification = new Notification({

            user: printRequest.user,

            title: "Print Ready",

            message: `${printRequest.documentName} is ready for pickup.`

        });

        await notification.save();

        return res.status(200).json({

            message: "Document Printed Successfully",

            printRequest,
            notification

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};