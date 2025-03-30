const { User } = require("../models");
const authenticate = require("./authenticate");

async function authenticateAdmin(req, res, next) {
    try {
        await authenticate(req, res, async () => {
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ status: false, error: "User not found" });
            }
            if (user.role === "admin") {
                return next();
            }
            return res.status(401).json({ status: false, error: "Unauthorized" });
        });
    } catch (error) {
        return res.status(500).json({ status: false, error: "Internal Server Error" });
    }
}

module.exports = authenticateAdmin;
