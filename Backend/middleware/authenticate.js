const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ error: "Access Denied" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            req.user = { _id: decoded.id };
            console.log("success")
            next();
        } else {
            return res.status(401).json({error: "Unauthorised"})
        }
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = authenticate;
