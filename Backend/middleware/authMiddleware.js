const jwt = require("jsonwebtoken");

// ======================================
// Verify JWT Token Middleware
// ======================================
const verifyToken = (req, res, next) => {

    const authHeader = req.header("Authorization");

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided"
        });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

    console.log("Extracted Token:", token);

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded User:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;