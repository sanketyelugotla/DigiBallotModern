const express = require("express");
const { authService } = require("../services/index.js")

const router = express.Router();

// 📌 Register User
router.post("/register", async (req, res) => {
    try {
        const response = await authService.registerUser(req.body);
        res.status(201).json(response);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ message: error.message });
    }
});

// 📌 Login User
router.post("/login", async (req, res) => {
    try {
        const response = await authService.loginUser(req.body);
        res.json(response);
    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
