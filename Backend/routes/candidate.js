const express = require("express");
const mongoose = require("mongoose");
const authenticate = require("../middleware/authenticate.js");
const { upload, getGfsBucket } = require("../config/multerConfig.js");
const { Candidate } = require("../models/models.index.js");

const details = express.Router();

// 📌 POST: Upload image and update candidate details
details.post("/details", authenticate, upload.single("file"), async (req, res) => {
    const { _id } = req.user;
    console.log("Authenticated user ID:", _id);

    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }

    const { fullName, email, mobile, education, dob, gender, profession } = req.body;

    try {
        const gfsBucket = getGfsBucket();
        if (!gfsBucket) {
            return res.status(500).json({ message: "GridFSBucket not initialized" });
        }

        // Upload the file
        const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
            contentType: req.file.mimetype,
        });

        uploadStream.end(req.file.buffer);

        uploadStream.on("error", (err) => {
            console.error("GridFS error:", err);
            return res.status(500).json({ message: "File upload failed" });
        });

        uploadStream.on("finish", async function () {
            console.log("Upload finished: ", uploadStream.id); // Debugging
            const cand = await Candidate.findOne({ userId: _id });
            console.log("Cand", cand)

            const updateCandidate = await Candidate.findOneAndUpdate(
                { userId: _id },
                {
                    fullName,
                    email,
                    mobileNumber: mobile,
                    education,
                    dob,
                    gender,
                    self_profession: profession,
                    img: uploadStream.id, // Store GridFS file ID
                },
                { new: true, runValidators: true }
            );

            if (!updateCandidate) {
                return res.status(404).json({ message: "Candidate not found" });
            }

            return res.status(200).json({
                message: "Candidate updated successfully",
                candidate: updateCandidate,
                fileId: uploadStream.id, // Return the file ID
            });
        });
    } catch (error) {
        console.error("Error updating candidate:", error);
        return res.status(500).json({ message: error.message });
    }
});


details.get("/image/:userId", async (req, res) => {
    const { userId } = req.params;

    console.log("Fetching image for user ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        // Find candidate by userId
        const candidate = await Candidate.findOne({ userId });

        if (!candidate || !candidate.img) {
            return res.status(404).json({ message: "Candidate or image not found" });
        }

        const imgId = candidate.img; // GridFS file ID

        // Fetch image from GridFS
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads" // Ensure this matches your GridFS bucket
        });

        const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(imgId));

        res.set("Content-Type", "image/png"); // Adjust the content type if needed
        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching candidate image:", error);
        return res.status(500).json({ message: error.message });
    }
});


module.exports = details;