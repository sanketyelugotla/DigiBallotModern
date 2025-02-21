const express = require("express");
const voter = express.Router();
const authenticate = require("../middleware/authenticate")
const { voterService, adminService } = require("../services/index");

voter.post("/vote", authenticate, async (req, res) => {
    const { candidateId, electionId } = req.body;
    try {
        console.log(req.user);
        const voterId = await voterService.getVoterIdFromUserId(req.user._id);
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