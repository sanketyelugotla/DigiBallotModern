const express = require("express");
const election = express.Router();
const { electionService } = require("../services/index");

election.get("/", async (req, res) => {
    try {
        const elections = await electionService.getActiveElections();
        return res.status(200).json({ success: true, messsage: "Active elections", elections })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})

election.get("/elections", async (req, res) => {
    try {
        const elections = await electionService.getElectionsForAdmin(req);
        return res.status(200).json({ success: true, messsage: "Elections fetched successfully", elections })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})

election.get("/all", async (req, res) => {
    try {
        const elections = await electionService.getAllElections();
        return res.status(200).json({success: true, message: "Fetched elections successfully", elections});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
})

module.exports = election