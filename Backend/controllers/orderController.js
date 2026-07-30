const Order = require("../models/Order");

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

        const tokenNumber = lastOrder ? lastOrder.tokenNumber + 1 : 1001;

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

        // Staff sees only their department orders
        if (req.user.role === "staff") {

            filter.module = req.user.department;

        }

        // Student sees only their own orders
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
            { new: true }
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
        }).sort({ createdAt: -1 });

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