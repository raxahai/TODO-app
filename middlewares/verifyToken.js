const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(404).json({
        message: "Access denied"
    });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(404).json({
            message: "Invalid token"
        });
    }
}

module.exports.auth = auth;