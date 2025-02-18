const express = require("express");
const voter = express.Router();
const { voterService, adminService } = require("../services/index")

voter.post("/vote", async (req, res) => {
    const { voterId, candidateId, electionId } = req.body;
    try {
        const vote = await voterService.voteCandidate(voterId, candidateId, electionId);
        return res.status(201).json({ message: vote.message });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
})

voter.post("/getVotes/:electionId", async (req, res) => {
    try {
        const votes = voterService.getVotes(req.params.electionId)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
})

module.exports = voter;