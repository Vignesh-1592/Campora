const jwt = require("jsonwebtoken");

// ======================================
// Campora JWT Authentication Middleware
// ======================================

const verifyToken = (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");

        // Check Authorization Header
        if (!authHeader) {

            return res.status(401).json({

                message: "Access Denied. No token provided."

            });

        }

        // Extract Bearer Token
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.substring(7)
            : authHeader;

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach User Details
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({

            message: "Invalid or Expired Token"

        });

    }

};

module.exports = verifyToken;