const express = require("express");
const { Party } = require("../models/models.index.js");
const { upload } = require("../config/multerConfig.js");
const { uploadFile, getFileStream } = require("../utils/uploadUtils.js");
const mongoose = require("mongoose");

const router = express.Router();

// 📌 POST: Add a Party with Image
router.post("/addParty", upload.fields([{ name: "image" }]), async (req, res) => {
    const { party } = req.body;

    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "Image is required" });
    }

    try {
        const imageId = await uploadFile(req.files.image[0]);
        console.log("Upload Finished: Image ID:", imageId);

        const newParty = new Party({
            partyName: party,
            partyImage: imageId,
        });

        const createdParty = await newParty.save();
        if (!createdParty) return res.status(404).json({ message: "Uploading failed" });

        return res.status(200).json({ message: "Party created successfully", createdParty });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

// 📌 GET: Retrieve Party Image
router.get("/image/:partyId", async (req, res) => {
    const { partyId } = req.params;
    console.log("Fetching image for Party ID:", partyId);

    if (!mongoose.Types.ObjectId.isValid(partyId)) {
        return res.status(400).json({ message: "Invalid Party ID" });
    }

    try {
        const party = await Party.findById(partyId);
        if (!party || !party.partyImage) {
            return res.status(404).json({ message: "Party or image not found" });
        }

        const downloadStream = await getFileStream(party.partyImage);

        res.set("Content-Type", "image/png"); // Adjust if necessary
        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching party image:", error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;