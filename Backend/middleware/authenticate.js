const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    const token = req.header("auth");
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
