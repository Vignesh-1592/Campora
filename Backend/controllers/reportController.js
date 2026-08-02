const Order = require("../models/Order");

// ======================================
// Total Revenue
// ======================================

exports.getTotalRevenue = async (req, res) => {

    try {

        const revenue = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "Paid"
                }
            },

            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalPrice"
                    }
                }
            }

        ]);

        return res.status(200).json({

            success: true,

            message: "Total Revenue Retrieved Successfully",

            totalRevenue:

                revenue.length > 0

                    ? revenue[0].totalRevenue

                    : 0

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
// Today's Revenue
// ======================================

exports.getTodayRevenue = async (req, res) => {

    try {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const revenue = await Order.aggregate([

            {

                $match: {

                    paymentStatus: "Paid",

                    createdAt: {

                        $gte: today

                    }

                }

            },

            {

                $group: {

                    _id: null,

                    totalRevenue: {

                        $sum: "$totalPrice"

                    }

                }

            }

        ]);

        return res.status(200).json({

            success: true,

            message: "Today's Revenue Retrieved Successfully",

            todayRevenue:

                revenue.length > 0

                    ? revenue[0].totalRevenue

                    : 0

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
// Weekly Revenue
// ======================================

exports.getWeeklyRevenue = async (req, res) => {

    try {

        const today = new Date();

        const firstDayOfWeek = new Date(today);

        firstDayOfWeek.setDate(today.getDate() - today.getDay());

        firstDayOfWeek.setHours(0, 0, 0, 0);

        const revenue = await Order.aggregate([

            {

                $match: {

                    paymentStatus: "Paid",

                    createdAt: {

                        $gte: firstDayOfWeek

                    }

                }

            },

            {

                $group: {

                    _id: null,

                    totalRevenue: {

                        $sum: "$totalPrice"

                    }

                }

            }

        ]);

        return res.status(200).json({

            success: true,

            message: "Weekly Revenue Retrieved Successfully",

            weeklyRevenue:

                revenue.length > 0

                    ? revenue[0].totalRevenue

                    : 0

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
// Monthly Revenue
// ======================================

exports.getMonthlyRevenue = async (req, res) => {

    try {

        const now = new Date();

        const firstDay = new Date(

            now.getFullYear(),

            now.getMonth(),

            1

        );

        const revenue = await Order.aggregate([

            {

                $match: {

                    paymentStatus: "Paid",

                    createdAt: {

                        $gte: firstDay

                    }

                }

            },

            {

                $group: {

                    _id: null,

                    totalRevenue: {

                        $sum: "$totalPrice"

                    }

                }

            }

        ]);

        return res.status(200).json({

            success: true,

            message: "Monthly Revenue Retrieved Successfully",

            monthlyRevenue:

                revenue.length > 0

                    ? revenue[0].totalRevenue

                    : 0

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
// Yearly Revenue
// ======================================

exports.getYearlyRevenue = async (req, res) => {

    try {

        const now = new Date();

        const firstDayOfYear = new Date(

            now.getFullYear(),

            0,

            1

        );

        const revenue = await Order.aggregate([

            {

                $match: {

                    paymentStatus: "Paid",

                    createdAt: {

                        $gte: firstDayOfYear

                    }

                }

            },

            {

                $group: {

                    _id: null,

                    totalRevenue: {

                        $sum: "$totalPrice"

                    }

                }

            }

        ]);

        return res.status(200).json({

            success: true,

            message: "Yearly Revenue Retrieved Successfully",

            yearlyRevenue:

                revenue.length > 0

                    ? revenue[0].totalRevenue

                    : 0

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
// Dashboard Summary
// ======================================

exports.getDashboardSummary = async (req, res) => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        // Revenue
        const totalRevenue = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "Paid"
                }
            },

            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: "$totalPrice"
                    }
                }
            }

        ]);

        const todayRevenue = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "Paid",
                    createdAt: {
                        $gte: today
                    }
                }
            },

            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: "$totalPrice"
                    }
                }
            }

        ]);

        const monthlyRevenue = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "Paid",
                    createdAt: {
                        $gte: firstDayOfMonth
                    }
                }
            },

            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: "$totalPrice"
                    }
                }
            }

        ]);

        // Orders
        const totalOrders = await Order.countDocuments();

        const pendingOrders = await Order.countDocuments({
            orderStatus: "Pending"
        });

        const preparingOrders = await Order.countDocuments({
            orderStatus: "Preparing"
        });

        const readyOrders = await Order.countDocuments({
            orderStatus: "Ready for Pickup"
        });

        const completedOrders = await Order.countDocuments({
            orderStatus: "Completed"
        });

        return res.status(200).json({

            success: true,

            message: "Dashboard Summary Retrieved Successfully",

            dashboard: {

                totalRevenue:

                    totalRevenue.length > 0

                        ? totalRevenue[0].amount

                        : 0,

                todayRevenue:

                    todayRevenue.length > 0

                        ? todayRevenue[0].amount

                        : 0,

                monthlyRevenue:

                    monthlyRevenue.length > 0

                        ? monthlyRevenue[0].amount

                        : 0,

                totalOrders,

                pendingOrders,

                preparingOrders,

                readyOrders,

                completedOrders

            }

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
// Total Orders
// ======================================

exports.getTotalOrders = async (req, res) => {

    try {

        const totalOrders = await Order.countDocuments();

        return res.status(200).json({

            success: true,

            message: "Total Orders Retrieved Successfully",

            totalOrders

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
// Order Status Statistics
// ======================================

exports.getOrderStatusStats = async (req, res) => {

    try {

        const pending = await Order.countDocuments({

            orderStatus: "Pending"

        });

        const preparing = await Order.countDocuments({

            orderStatus: "Preparing"

        });

        const readyForPickup = await Order.countDocuments({

            orderStatus: "Ready for Pickup"

        });

        const completed = await Order.countDocuments({

            orderStatus: "Completed"

        });

        return res.status(200).json({

            success: true,

            message: "Order Status Statistics Retrieved Successfully",

            statistics: {

                pending,

                preparing,

                readyForPickup,

                completed

            }

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
// Payment Statistics
// ======================================

exports.getPaymentStats = async (req, res) => {

    try {

        const paid = await Order.countDocuments({

            paymentStatus: "Paid"

        });

        const pending = await Order.countDocuments({

            paymentStatus: "Pending"

        });

        const totalRevenue = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "Paid"
                }
            },

            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: "$totalPrice"
                    }
                }
            }

        ]);

        return res.status(200).json({

            success: true,

            message: "Payment Statistics Retrieved Successfully",

            statistics: {

                paidOrders: paid,

                pendingPayments: pending,

                totalRevenue:

                    totalRevenue.length > 0

                        ? totalRevenue[0].amount

                        : 0

            }

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
// Department Revenue
// ======================================

exports.getDepartmentRevenue = async (req, res) => {

    try {

        const revenue = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "Paid"
                }
            },

            {
                $group: {

                    _id: "$module",

                    totalRevenue: {
                        $sum: "$totalPrice"
                    },

                    totalOrders: {
                        $sum: 1
                    }

                }
            },

            {
                $sort: {
                    totalRevenue: -1
                }
            }

        ]);

        return res.status(200).json({

            success: true,

            message: "Department Revenue Retrieved Successfully",

            departments: revenue

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
// Top Selling Products
// ======================================

exports.getTopSellingProducts = async (req, res) => {

    try {

        const products = await Order.aggregate([

            {
                $group: {

                    _id: "$itemName",

                    totalQuantity: {

                        $sum: "$quantity"

                    },

                    totalRevenue: {

                        $sum: "$totalPrice"

                    },

                    totalOrders: {

                        $sum: 1

                    }

                }

            },

            {
                $sort: {

                    totalQuantity: -1

                }

            },

            {
                $limit: 10
            }

        ]);

        return res.status(200).json({

            success: true,

            message: "Top Selling Products Retrieved Successfully",

            products

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
// Custom Date Report
// ======================================

exports.getCustomDateReport = async (req, res) => {

    try {

        const { start, end } = req.query;

        if (!start || !end) {

            return res.status(400).json({

                success: false,

                message: "Start date and End date are required."

            });

        }

        const startDate = new Date(start);

        const endDate = new Date(end);

        endDate.setHours(23, 59, 59, 999);

        const orders = await Order.find({

            createdAt: {

                $gte: startDate,

                $lte: endDate

            }

        });

        const revenue = orders.reduce((sum, order) => {

            return order.paymentStatus === "Paid"

                ? sum + order.totalPrice

                : sum;

        }, 0);

        return res.status(200).json({

            success: true,

            message: "Custom Report Retrieved Successfully",

            report: {

                startDate: start,

                endDate: end,

                totalOrders: orders.length,

                totalRevenue: revenue,

                pendingOrders: orders.filter(
                    o => o.orderStatus === "Pending"
                ).length,

                preparingOrders: orders.filter(
                    o => o.orderStatus === "Preparing"
                ).length,

                readyOrders: orders.filter(
                    o => o.orderStatus === "Ready for Pickup"
                ).length,

                completedOrders: orders.filter(
                    o => o.orderStatus === "Completed"
                ).length

            }

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
// Module Report
// ======================================

exports.getModuleReport = async (req, res) => {

    try {

        const { module } = req.query;

        if (!module) {

            return res.status(400).json({

                success: false,

                message: "Module is required."

            });

        }

        const orders = await Order.find({

            module

        });

        const revenue = orders.reduce((sum, order) => {

            return order.paymentStatus === "Paid"

                ? sum + order.totalPrice

                : sum;

        }, 0);

        return res.status(200).json({

            success: true,

            message: "Module Report Retrieved Successfully",

            report: {

                module,

                totalOrders: orders.length,

                totalRevenue: revenue,

                pendingOrders: orders.filter(
                    o => o.orderStatus === "Pending"
                ).length,

                preparingOrders: orders.filter(
                    o => o.orderStatus === "Preparing"
                ).length,

                readyOrders: orders.filter(
                    o => o.orderStatus === "Ready for Pickup"
                ).length,

                completedOrders: orders.filter(
                    o => o.orderStatus === "Completed"
                ).length

            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};