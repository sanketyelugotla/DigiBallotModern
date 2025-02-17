const express = require("express");
const mongoose = require("mongoose");
const authenticate = require("../middleware/authenticate.js");
const { upload } = require("../config/multerConfig.js");
const { candidateService } = require("../services/index.js")

const details = express.Router();

// 📌 POST: Upload image and update candidate details
details.post("/details", authenticate, upload.fields([{ name: "image" }, { name: "manifesto" }]), async (req, res) => {
    try {
        const response = await candidateService.updateCandidateDetails(req.user._id, req.files, req.body);
        return res.status(200).json({
            message: "Candidate updated successfully",
            ...response,
        });
    } catch (error) {
        console.error("Error updating candidate:", error);
        return res.status(400).json({ message: error.message });
    }
});

// 📌 GET: Retrieve Candidate Image
details.get("/image/:userId", async (req, res) => {
    try {
        const downloadStream = await candidateService.getCandidateImage(req.params.userId);
        res.set("Content-Type", "image/png");
        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching candidate image:", error);
        return res.status(400).json({ message: error.message });
    }
});

module.exports = details;
