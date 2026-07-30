const Order = require("../models/Order");

// ======================================
// Staff Dashboard
// ======================================

exports.getStaffDashboard = async (req, res) => {

    try {

        const department = req.user.department;

        // Pending Orders
        const pendingOrders = await Order.countDocuments({
            module: department,
            orderStatus: "Pending"
        });

        // Completed Orders
        const completedOrders = await Order.countDocuments({
            module: department,
            orderStatus: "Completed"
        });

        // Today's Date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Today's Orders
        const todaysOrders = await Order.countDocuments({
            module: department,
            createdAt: {
                $gte: today
            }
        });

        // Today's Revenue
        const revenue = await Order.aggregate([
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

        const todaysRevenue =
            revenue.length > 0 ? revenue[0].totalRevenue : 0;

        return res.status(200).json({

            message: "Staff Dashboard Retrieved Successfully",

            staff: {
                name: req.user.name,
                role: req.user.role,
                department
            },

            dashboard: {
                pendingOrders,
                completedOrders,
                todaysOrders,
                todaysRevenue
            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
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

        // Total Orders
        const totalOrders = await Order.countDocuments({
            user: studentId
        });

        // Today's Orders
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todaysOrders = await Order.countDocuments({
            user: studentId,
            createdAt: {
                $gte: today
            }
        });

        // Total Amount Spent (Only Paid Orders)
        const paidOrders = await Order.find({
            user: studentId,
            paymentStatus: "Paid"
        });

        const totalSpent = paidOrders.reduce((sum, order) => {
            return sum + order.totalPrice;
        }, 0);

        // Recent Orders
        const recentOrders = await Order.find({
            user: studentId
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("itemName module quantity totalPrice orderStatus createdAt");

        return res.status(200).json({

            message: "Student Dashboard Retrieved Successfully",

            student: {
                name: req.user.name,
                rollNumber: req.user.rollNumber,
                department: req.user.department
            },

            dashboard: {
                totalOrders,
                todaysOrders,
                totalSpent,
                recentOrders
            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};