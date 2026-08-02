const Order = require("../models/Order");

// ======================================
// Staff Dashboard
// ======================================

exports.getStaffDashboard = async (req, res) => {

    try {

        const department = req.user.department;

        // Today's Date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // First Day of Week
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());

        // First Day of Month
        const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        // First Day of Year
        const firstDayOfYear = new Date(
            today.getFullYear(),
            0,
            1
        );

        // Pending Orders
        const pendingOrders = await Order.countDocuments({
            module: department,
            orderStatus: "Pending"
        });

        // Ready for Pickup Orders
        const readyOrders = await Order.countDocuments({
            module: department,
            orderStatus: "Ready for Pickup"
        });

        // Completed Orders
        const completedOrders = await Order.countDocuments({
            module: department,
            orderStatus: "Completed"
        });

        // Today's Orders
        const todaysOrders = await Order.countDocuments({
            module: department,
            createdAt: {
                $gte: today
            }
        });

        // Today's Revenue
        const todayRevenue = await Order.aggregate([

            {
                $match: {
                    module: department,
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

        // Weekly Revenue
        const weekRevenue = await Order.aggregate([

            {
                $match: {
                    module: department,
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

        // Monthly Revenue
        const monthRevenue = await Order.aggregate([

            {
                $match: {
                    module: department,
                    paymentStatus: "Paid",
                    createdAt: {
                        $gte: firstDayOfMonth
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

        // Yearly Revenue
        const yearRevenue = await Order.aggregate([

            {
                $match: {
                    module: department,
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

            message: "Staff Dashboard Retrieved Successfully",

            staff: {

                name: req.user.name,
                role: req.user.role,
                department

            },

            dashboard: {

                pendingOrders,

                readyOrders,

                completedOrders,

                todaysOrders,

                todaysRevenue:
                    todayRevenue.length > 0
                        ? todayRevenue[0].totalRevenue
                        : 0,

                weeklyRevenue:
                    weekRevenue.length > 0
                        ? weekRevenue[0].totalRevenue
                        : 0,

                monthlyRevenue:
                    monthRevenue.length > 0
                        ? monthRevenue[0].totalRevenue
                        : 0,

                yearlyRevenue:
                    yearRevenue.length > 0
                        ? yearRevenue[0].totalRevenue
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
// Student Dashboard
// ======================================

exports.getStudentDashboard = async (req, res) => {

    try {

        const studentId = req.user.id;

        // Today's Date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Total Orders
        const totalOrders = await Order.countDocuments({
            user: studentId
        });

        // Pending Orders
        const pendingOrders = await Order.countDocuments({
            user: studentId,
            orderStatus: "Pending"
        });

        // Ready for Pickup Orders
        const readyOrders = await Order.countDocuments({
            user: studentId,
            orderStatus: "Ready for Pickup"
        });

        // Completed Orders
        const completedOrders = await Order.countDocuments({
            user: studentId,
            orderStatus: "Completed"
        });

        // Today's Orders
        const todaysOrders = await Order.countDocuments({
            user: studentId,
            createdAt: {
                $gte: today
            }
        });

        // Total Amount Spent
        const revenue = await Order.aggregate([

            {
                $match: {
                    user: req.user._id,
                    paymentStatus: "Paid"
                }
            },

            {
                $group: {
                    _id: null,
                    totalSpent: {
                        $sum: "$totalPrice"
                    }
                }
            }

        ]);

        const totalSpent =
            revenue.length > 0
                ? revenue[0].totalSpent
                : 0;

        // Recent Orders
        const recentOrders = await Order.find({

            user: studentId

        })

        .sort({

            createdAt: -1

        })

        .limit(5)

        .select(
            "itemName module quantity totalPrice paymentStatus orderStatus tokenNumber createdAt"
        );

        return res.status(200).json({

            success: true,

            message: "Student Dashboard Retrieved Successfully",

            student: {

                name: req.user.name,

                rollNumber: req.user.rollNumber,

                department: req.user.department

            },

            dashboard: {

                totalOrders,

                pendingOrders,

                readyOrders,

                completedOrders,

                todaysOrders,

                totalSpent,

                recentOrders

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