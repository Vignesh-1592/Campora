// ======================================
// Campora Role Authorization Middleware
// ======================================

const authorizeRoles = (...allowedRoles) => {

    return (req, res, next) => {

        // Check Authentication
        if (!req.user) {

            return res.status(401).json({

                message: "Unauthorized Access"

            });

        }

        // Check Role Authorization
        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({

                message: "Access Denied. You do not have permission to access this resource."

            });

        }

        next();

    };

};

module.exports = authorizeRoles;