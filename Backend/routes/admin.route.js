const express = require("express");
const { adminService } = require("../services")
const admin = express.Router();

admin.post("/addElection", async (req, res) => {
    const { name, startDate, endDate } = req.body;
    try {
        const election = await adminService.addElection(name, startDate, endDate)
        res.status(201).json({ message: "Election created successfully", election })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

admin.post("/approve/:candidateId", async (req, res) => {
    try {
        const candidate = await adminService.approveCandidate(req.params.candidateId);
        if (!candidate) throw new Error("Could not register approve candidate");
        res.status(200).json({ message: "Candidate approved successfully", candidate })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

admin.get("/candidates", async (req, res) => {
    try {
        const candidates = await adminService.getPendingCandidates();
        return res.status(200).json(candidates);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})


module.exports = admin