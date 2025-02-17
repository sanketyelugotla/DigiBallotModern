const express = require("express");
const { upload } = require("../config/multerConfig.js");
const { partyService } = require("../services/index.js")

const router = express.Router();

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

// 📌 GET: Retrieve Party Image
router.get("/image/:partyId", async (req, res) => {
    const { partyId } = req.params;
    console.log("Fetching image for Party ID:", partyId);

    try {
        const downloadStream = await partyService.getPartyImage(partyId);
        res.set("Content-Type", "image/png"); // Adjust if necessary
        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching party image:", error);
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;
