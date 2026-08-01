// ======================================
// Campora Department Authorization Middleware
// ======================================

const allowDepartment = (...allowedDepartments) => {

    return (req, res, next) => {

        // Super Administrator can access everything
        if (req.user.role === "superadmin") {
            return next();
        }

        // Only Department Administrators are allowed
        if (req.user.role !== "departmentadmin") {

            return res.status(403).json({
                message: "Access Denied. Department Administrator access required."
            });

        }

        // Department Validation
        if (!allowedDepartments.includes(req.user.department)) {

            return res.status(403).json({
                message: `Access Denied. Only ${allowedDepartments.join(", ")} Department Administrator can access this resource.`
            });

        }

        next();

    };

};

module.exports = allowDepartment;