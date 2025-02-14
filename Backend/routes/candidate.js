const express = require("express");
const mongoose = require("mongoose");
const authenticate = require("../middleware/authenticate.js");
const { upload } = require("../config/multerConfig.js");
const { Candidate } = require("../models/models.index.js");
const { uploadFile, getFileStream } = require("../utils/uploadUtils.js");

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
        const imageId = await uploadFile(req.files.image[0]);
        const manifestoId = await uploadFile(req.files.manifesto[0]);

        console.log("Upload Finished: Image ID:", imageId, "Manifesto ID:", manifestoId);

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
                image: imageId,
                manifesto: manifestoId,
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
                image: imageId,
                manifesto: manifestoId,
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

        const downloadStream = await getFileStream(candidate.image);

        res.set("Content-Type", "image/png");
        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching candidate image:", error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = details;
