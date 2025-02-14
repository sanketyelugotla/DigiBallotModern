const express = require("express");
const mongoose = require("mongoose");
const authenticate = require("../middleware/authenticate.js");
const { upload, getGfsBucket } = require("../config/multerConfig.js");
const { Candidate } = require("../models/models.index.js");

const details = express.Router();

// 📌 POST: Upload image and update candidate details
details.post("/details", authenticate, upload.fields([{ name: "image" }, { name: "manifesto" }]), async (req, res) => {
    const { _id } = req.user;
    console.log("Authenticated user ID:", _id);

    if (!req.files || !req.files.image || !req.files.manifesto) {
        return res.status(400).json({ message: "Both image and manifesto files are required" });
    }

    const { fullName, email, mobile, education, dob, gender, profession, party, state, spouse, spouse_profession, liabilities, assets } = req.body;

    try {
        const gfsBucket = getGfsBucket();
        if (!gfsBucket) {
            return res.status(500).json({ message: "GridFSBucket not initialized" });
        }

        // Upload Image
        const imageFile = req.files.image[0];
        const imageUploadStream = gfsBucket.openUploadStream(imageFile.originalname, {
            contentType: imageFile.mimetype,
        });
        await new Promise((resolve, reject) => {
            imageUploadStream.end(imageFile.buffer, (err) => (err ? reject(err) : resolve()));
        });

        // Upload Manifesto
        const manifestoFile = req.files.manifesto[0];
        const manifestoUploadStream = gfsBucket.openUploadStream(manifestoFile.originalname, {
            contentType: manifestoFile.mimetype,
        });
        await new Promise((resolve, reject) => {
            manifestoUploadStream.end(manifestoFile.buffer, (err) => (err ? reject(err) : resolve()));
        });

        console.log("Upload Finished: Image ID:", imageUploadStream.id, "Manifesto ID:", manifestoUploadStream.id);

        const updateCandidate = await Candidate.findOneAndUpdate(
            { userId: _id },
            {
                fullName,
                email,
                mobile,
                education,
                dob,
                gender,
                self_profession: profession,
                image: imageUploadStream.id,
                manifesto: manifestoUploadStream.id,
                party,
                state,
                spouse,
                spouse_profession,
                liabilities,
                assets
            },
            { new: true, runValidators: true }
        );

        if (!updateCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        return res.status(200).json({
            message: "Candidate updated successfully",
            candidate: updateCandidate,
            fileIds: {
                image: imageUploadStream.id,
                manifesto: manifestoUploadStream.id,
            },
        });

    } catch (error) {
        console.error("Error updating candidate:", error);
        return res.status(500).json({ message: error.message });
    }
});

// 📌 GET: Retrieve Candidate Image
details.get("/image/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log("Fetching image for user ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const candidate = await Candidate.findOne({ userId });

        if (!candidate || !candidate.image) {
            return res.status(404).json({ message: "Candidate or image not found" });
        }

        const bucket = getGfsBucket();
        const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(candidate.image));

        res.set("Content-Type", "image/png"); // Adjust content type if needed
        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching candidate image:", error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = details;