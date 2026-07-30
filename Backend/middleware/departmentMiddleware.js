// ======================================
// Department Authorization Middleware
// ======================================

const authorizeDepartment = (...departments) => {

    return (req, res, next) => {

        // Admin can access everything
        if (req.user.role === "admin") {
            return next();
        }

        // Check department
        if (!departments.includes(req.user.department)) {

            return res.status(403).json({
                message: "Access Denied. Wrong Department."
            });

        }

        next();

    };

};

module.exports = authorizeDepartment;