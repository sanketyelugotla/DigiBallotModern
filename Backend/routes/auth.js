const mongoose = require("mongoose");
const User = require("../models/User");
const Voter = require("../models/Voter");
const Candidate = require("../models/Candidate");
const express = require("express");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, party } = req.body;

        let user = await User.findOne({ email: email.toLowerCase() });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ name, email: email.toLowerCase(), password, role }); // No manual hashing
        await user.save();

        switch (role) {
            case 'voter':
                await new Voter({ userId: user._id }).save();
                break;
            case 'candidate':
                await new Candidate({ userId: user._id, party }).save();
                break;
        }

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailLower = email.toLowerCase(); // Normalize email

        console.log("Email being passed:", emailLower);
        const user = await User.findOne({ email: emailLower });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log("User found:", user);
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, role: user.role });
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
