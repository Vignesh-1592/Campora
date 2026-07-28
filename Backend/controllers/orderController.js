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
// Get All Orders
// ===============================
exports.getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find().sort({ createdAt: -1 });

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