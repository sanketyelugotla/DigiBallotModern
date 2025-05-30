const express = require("express");
const { upload } = require("../config/multerConfig.js");
const { partyService } = require("../services/index.js")

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const parties = await partyService.getParties();
        res.status(200).json({ message: "Parties fetched successfully", parties })
    } catch (error) {
        console.log("Unable to get parties", error.message);
        res.status(500).json({ message: error.message })
    }
})

router.get("/:partyId", async (req, res) => {
    try {
        const party = await partyService.getParty(req.params.partyId);
        return res.status(200).json(party);
    } catch (error) {
        console.error("Error fetching candidate party:", error);
        return res.status(400).json({ message: error.message });
    }
})

router.get("/election/:electionId", async (req, res) => {
    try {
        const party = await partyService.getPartyByElectionId(req.params.electionId);
        return res.status(200).json({ success: true, message: "Paties fetched successfully", party: party });
    } catch (error) {
        console.error("Error fetching parties:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
})

// 📌 POST: Add a Party with Image
router.post("/addParty", upload.fields([{ name: "partyImage" }]), async (req, res) => {
    const { partyName, state, adminId, electionId } = req.body;
    console.log(req.body)
    try {
        const createdParty = await partyService.addParty(electionId, adminId, state, partyName, req.files?.partyImage?.[0]);
        return res.status(200).json({ success: true, message: "Party created successfully", createdParty });
    } catch (error) {
        console.error("Error creating party:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
});

router.post("/addCandidate", async (req, res) => {
    const { partyId, candidateId } = req.body;
    console.log(req.body)
    try {
        const addedParty = await partyService.addCandidate(partyId, candidateId);
        res.status(200).json({ message: "Candidate registered to party successfully", addedParty });
    } catch (error) {
        console.log("Error adding candidate to party", error);
        return res.status(500).json({ message: error.message })
    }
})

module.exports = router;
