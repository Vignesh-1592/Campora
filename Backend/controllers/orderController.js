const mongoose = require("mongoose");
const Order = require("../models/Order");
const Notification = require("../models/Notification");

// ======================================
// Place Order
// Student
// ======================================
exports.addOrder = async (req, res) => {

    try {

        const {
            module,
            itemId,
            itemName,
            quantity,
            totalPrice
        } = req.body;

        // Required Field Validation
        if (
            !module ||
            !itemId ||
            !itemName ||
            !quantity ||
            totalPrice == null
        ) {

            return res.status(400).json({
                success: false,
                message: "Module, Item, Quantity and Total Price are required."
            });

        }

        // Generate Token Number
        const lastOrder = await Order.findOne().sort({
            tokenNumber: -1
        });

        const tokenNumber = lastOrder
            ? lastOrder.tokenNumber + 1
            : 1001;

        const order = await Order.create({

            user: req.user.id,
            module,
            itemId,
            itemName,
            quantity,
            totalPrice,
            tokenNumber

        });

        // Notification
        await Notification.create({

            user: order.user,

            module: order.module,

            title: "Order Placed",

            message:
                `Your order for ${order.itemName} has been placed successfully. Token Number: ${order.tokenNumber}.`

        });

        return res.status(201).json({

            success: true,
            message: "Order Placed Successfully",
            order

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
// Get All Orders
// Admin
// ======================================
exports.getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()

            .populate("user", "name rollNumber department")

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,
            message: "Orders Retrieved Successfully",
            count: orders.length,
            orders

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
// Student Order History
// ======================================
exports.getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user.id

        })

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,
            message: "Student Orders Retrieved Successfully",
            count: orders.length,
            orders

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
// Search Orders
// Search by Item Name
// ======================================
exports.searchOrders = async (req, res) => {

    try {

        const { item } = req.query;

        if (!item) {

            return res.status(400).json({

                success: false,
                message: "Item name is required."

            });

        }

        const orders = await Order.find({

            itemName: {

                $regex: item,
                $options: "i"

            }

        }).populate("user", "name rollNumber");

        if (orders.length === 0) {

            return res.status(404).json({

                success: false,
                message: "No orders found."

            });

        }

        return res.status(200).json({

            success: true,
            message: "Order Search Successful",
            count: orders.length,
            orders

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
// Department Order History
// ======================================
exports.getStaffHistory = async (req, res) => {

    try {

        const orders = await Order.find({

            module: req.user.department

        })

        .populate("user", "name rollNumber")

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,
            message: "Department Orders Retrieved Successfully",
            department: req.user.department,
            count: orders.length,
            orders

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
// Filter Orders By Status
// ======================================
exports.getOrdersByStatus = async (req, res) => {

    try {

        const { status } = req.query;

        if (!status) {

            return res.status(400).json({

                success: false,
                message: "Order status is required."

            });

        }

        const orders = await Order.find({

            orderStatus: status

        })

        .populate("user", "name rollNumber");

        if (orders.length === 0) {

            return res.status(404).json({

                success: false,
                message: "No orders found."

            });

        }

        return res.status(200).json({

            success: true,
            message: "Orders Retrieved Successfully",
            count: orders.length,
            orders

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
// Pagination
// ======================================
exports.paginateOrders = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalOrders = await Order.countDocuments();

        const orders = await Order.find()

            .populate("user", "name rollNumber")

            .skip(skip)

            .limit(limit)

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,
            message: "Orders Retrieved Successfully",
            currentPage: page,
            totalPages: Math.ceil(totalOrders / limit),
            totalOrders,
            count: orders.length,
            orders

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
// Update Order
// ======================================
exports.updateOrder = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,
                message: "Invalid Order ID."

            });

        }

        const order = await Order.findByIdAndUpdate(

            id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!order) {

            return res.status(404).json({

                success: false,
                message: "Order Not Found"

            });

        }

        return res.status(200).json({

            success: true,
            message: "Order Updated Successfully",
            order

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
// Update Order Status
// ======================================
exports.updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { orderStatus } = req.body;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,
                message: "Invalid Order ID."

            });

        }

        const order = await Order.findById(id);

        if (!order) {

            return res.status(404).json({

                success: false,
                message: "Order Not Found"

            });

        }

        order.orderStatus = orderStatus;

        await order.save();

        let title = "";

        let message = "";

        if (orderStatus === "Preparing") {

            title = "Order Preparing";

            message = `Your ${order.itemName} is being prepared.`;

        }

        else if (orderStatus === "Ready for Pickup") {

            title = "Order Ready";

            message = `Your ${order.itemName} is ready for pickup. Token Number: ${order.tokenNumber}.`;

        }

        else if (orderStatus === "Completed") {

            title = "Order Completed";

            message = `Your ${order.itemName} has been collected successfully.`;

        }

        if (title !== "") {

            await Notification.create({

                user: order.user,

                module: order.module,

                title,

                message

            });

        }

        return res.status(200).json({

            success: true,
            message: "Order Status Updated Successfully",
            order

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};
// ===============================
// Update Payment Status
// ===============================
exports.updatePaymentStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { paymentStatus } = req.body;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Order ID."
            });

        }

        const order = await Order.findById(id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });

        }

        order.paymentStatus = paymentStatus;

        await order.save();

        if (paymentStatus === "Paid") {

            await Notification.create({

                user: order.user,

                module: order.module,

                title: "Payment Successful",

                message: `Payment of ₹${order.totalPrice} received successfully for ${order.itemName}.`

            });

        }

        return res.status(200).json({

            success: true,
            message: "Payment Status Updated Successfully",
            order

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ===============================
// Delete Order
// ===============================
exports.deleteOrder = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Order ID."
            });

        }

        const order = await Order.findByIdAndDelete(id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });

        }

        return res.status(200).json({

            success: true,
            message: "Order Deleted Successfully",
            order

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};