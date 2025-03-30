const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authenticateCandidate = require("../middleware/authenticateCandidate");

const router = express.Router();

// Set up storage for Multer (file uploads)
const storage = multer.diskStorage({
    destination: "./pics",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

router.get("/", (req, res) => {
    res.send("Temp")
})

// Handle form submission
router.post("/", upload.single("file"), (req, res) => {
    const { fullName, email, mobile, education, password, dob, gender, otp, profession } = req.body;
    const imagePath = req.file ? `/pics/${req.file.filename}` : "No image uploaded";

    // Format data for storing in a file
    const candidateData = `Full Name: ${fullName}
Email: ${email}
Mobile: ${mobile}
Education: ${education}
Password: ${password}
DOB: ${dob}
Gender: ${gender}
OTP: ${otp}
Profession: ${profession}
Image: ${imagePath}

`;

    // Append data to candidates.txt
    fs.appendFile("candidates.txt", candidateData, (err) => {
        if (err) {
            console.error("Error saving candidate:", err);
            return res.status(500).json({ error: "Failed to save candidate" });
        }
        res.json({ message: "Candidate saved successfully!", image: imagePath });
    });
});

router.get("/temp", authenticateCandidate, (req, res) => {
    return res.status(200).json("Temp")
});

module.exports = router;
