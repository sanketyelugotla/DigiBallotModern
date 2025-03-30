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

// 📌 POST: Add a Party with Image
router.post("/addParty", upload.fields([{ name: "image" }]), async (req, res) => {
    const { party } = req.body;

    try {
        const createdParty = await partyService.addParty(party, req.files?.image?.[0]);
        return res.status(200).json({ message: "Party created successfully", createdParty });
    } catch (error) {
        console.error("Error creating party:", error);
        return res.status(400).json({ message: error.message });
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
