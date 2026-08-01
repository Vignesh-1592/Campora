const Order = require("../models/Order");
const Notification = require("../models/Notification");

// ===============================
// Add Order
// ===============================
exports.addOrder = async (req, res) => {

    try {

        const {
            module,
            itemId,
            itemName,
            quantity,
            totalPrice
        } = req.body;

        // Generate Token Number
        const lastOrder = await Order.findOne().sort({ tokenNumber: -1 });

        const tokenNumber = lastOrder
            ? lastOrder.tokenNumber + 1
            : 1001;

        const order = new Order({

            user: req.user.id,
            module,
            itemId,
            itemName,
            quantity,
            totalPrice,
            tokenNumber

        });

        await order.save();

        // ======================================
        // Automatic Notification
        // ======================================

        await Notification.create({

            user: order.user,

            module: order.module,

            title: "Order Placed",

            message:
                `Your order for ${order.itemName} has been placed successfully. Token Number: ${order.tokenNumber}.`

        });

        return res.status(201).json({

            message: "Order Placed Successfully",

            order

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

// ===============================
// Get Department Orders
// ===============================
exports.getAllOrders = async (req, res) => {

    try {

        let filter = {};

        // Staff
        if (req.user.role === "staff") {

            filter.module = req.user.department;

        }

        // Student
        if (req.user.role === "student") {

            filter.user = req.user.id;

        }

        const orders = await Order.find(filter)

            .sort({ createdAt: -1 });

        return res.status(200).json({

            message: "Orders Retrieved Successfully",

            count: orders.length,

            orders

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

// ===============================
// Update Order
// ===============================
exports.updateOrder = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        return res.status(200).json({

            message: "Order Updated Successfully",

            order

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};
// ===============================
// Update Order Status
// ===============================
exports.updateOrderStatus = async (req, res) => {

    try {

        const { orderStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                message: "Order Not Found"
            });

        }

        order.orderStatus = orderStatus;

        await order.save();

        // ======================================
        // Automatic Notification
        // ======================================

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

            message = `Your ${order.itemName} has been collected successfully. Thank you for using Campora.`;

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

            message: "Order Status Updated Successfully",

            order

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

// ===============================
// Delete Order
// ===============================
exports.deleteOrder = async (req, res) => {

    try {

        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        return res.status(200).json({

            message: "Order Deleted Successfully",

            order

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

// ===============================
// Get Student Order History
// ===============================
exports.getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user.id

        })

        .sort({ createdAt: -1 });

        return res.status(200).json({

            message: "Student Orders Retrieved Successfully",

            count: orders.length,

            orders

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

// ===============================
// Update Payment Status
// ===============================
exports.updatePaymentStatus = async (req, res) => {

    try {

        const { paymentStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        order.paymentStatus = paymentStatus;

        await order.save();

        // ======================================
        // Automatic Payment Notification
        // ======================================

        if (paymentStatus === "Paid") {

            await Notification.create({

                user: order.user,

                module: order.module,

                title: "Payment Successful",

                message: `Payment of ₹${order.totalPrice} received successfully for ${order.itemName}.`

            });

        }

        return res.status(200).json({

            message: "Payment Status Updated Successfully",

            order

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

// ===============================
// Get Staff Department Order History
// ===============================
exports.getStaffHistory = async (req, res) => {

    try {

        const orders = await Order.find({

            module: req.user.department

        })

        .sort({ createdAt: -1 });

        return res.status(200).json({

            message: "Department Orders Retrieved Successfully",

            department: req.user.department,

            count: orders.length,

            orders

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};