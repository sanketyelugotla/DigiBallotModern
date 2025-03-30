const express = require("express");
const { candidateService, partyService } = require("../services/index.js")

const image = express.Router();

// 📌 GET: Retrieve Candidate Image
image.get("/candidate/image/:imageId", async (req, res) => {
    try {
        const downloadStream = await candidateService.getCandidateImage(req.params.imageId);
        res.set("Content-Type", "image/png");
        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching candidate image:", error);
        return res.status(400).json({ message: error.message });
    }
});

// 📌 GET: Retrieve Party Image
image.get("/party/image/:partyId", async (req, res) => {
    const { partyId } = req.params;
    console.log("Fetching image for Party ID:", partyId);

    try {
        const downloadStream = await partyService.getPartyImage(partyId);
        res.set("Content-Type", "image/png");
        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching party image:", error);
        return res.status(400).json({ message: error.message });
    }
});

module.exports = image;