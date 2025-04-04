const express = require("express");
const { authService } = require("../services/index.js")
const authenticate = require("../middleware/authenticate.js")

const router = express.Router();

// 📌 Register User
router.post("/register", async (req, res) => {
    try {
        const response = await authService.registerUser(req.body);
        res.status(201).json({ success: true, ...response });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// 📌 Login User
router.post("/login", async (req, res) => {
    try {
        const response = await authService.loginUser(req.body);
        res.status(200).json({ ...response, success: true });
    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get("/details", authenticate, async (req, res) => {
    try {
        const user = await authService.getUserDetails(req);
        res.status(200).json({ success: true, message: "User verified successfully", user });
    } catch (error) {
        console.error("Error Getting details:", error);
        res.status(400).json({ success: false, message: error.message });
    }
})

module.exports = router;
