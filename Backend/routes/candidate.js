const express = require("express");
const multer = require("multer");
const authenticate = require("../middleware/authenticate.js");
const { Candidate } = require("../models/models.index.js");

const details = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    },
});

details.post("/details", authenticate, upload.single("file"), async (req, res) => {
    const { _id } = req.user;
    console.log("Authenticated user ID:", _id);

    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }

    const { fullName, email, mobile, education, password, dob, gender, otp, profession } = req.body;

    try {
        const updateCandidate = await Candidate.findOneAndUpdate(
            {userId: _id},
            {
                fullName,
                email,
                mobileNumber: mobile, // Fix field name
                education,
                dob,
                gender,
                self_profession: profession,
                img: req.file.buffer, // Store image as binary
            },
            { new: true, runValidators: true }
        );

        if (!updateCandidate) {
            console.log("cand not found")
            return res.status(404).json({ message: "Candidate not found" });
        }

        return res.status(200).json({
            message: "Candidate updated successfully",
            candidate: updateCandidate,
            imageUrl: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        });
    } catch (error) {
        console.error("Error updating candidate:", error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = details;
