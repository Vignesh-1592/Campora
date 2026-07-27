const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};