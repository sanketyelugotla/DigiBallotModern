const express = require("express");
const { upload } = require("../config/multerConfig.js");
const { candidateService, partyService } = require("../services/index.js")

const candidate = express.Router();

// 📌 POST: Upload image and update candidate details
candidate.put("/updatecandidate", upload.fields([{ name: "image" }, { name: "manifesto" }]), async (req, res) => {
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

candidate.get("/:electionId", async (req, res) => {
    try {
        const candidates = await candidateService.getApprovedCandidates(req.params.electionId);
        return res.status(200).json(candidates);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

candidate.get("/get/user", async (req, res) => {
    try {
        const candidates = await candidateService.getCandidateDetailsByUserId(req.user._id);
        return res.status(200).json(candidates);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

candidate.get("/get/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const candidates = await candidateService.getCandidateDetails(id);
        return res.status(200).json(candidates);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

candidate.post("/register", async (req, res) => {
    const { electionId, partyId } = req.body;
    try {
        const candidate = await candidateService.registerForElection(req.user, electionId, partyId);
        if (!candidate.success) throw new Error(candidate.message);
        return res.status(201).json({ success: true, status: "pending", message: candidate.message })
    } catch (error) {
        console.log("Error registering", error.message);
        return res.status(500).json({ message: error.message });
    }
})

module.exports = candidate;
