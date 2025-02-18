const express = require("express");
const voter = express.Router();
const { voterService } = require("../services/index")

voter.post("/vote", async (req, res) => {
    const { voterId, candidateId, electionId } = req.body;
    try {
        const vote = await voterService.voteCandidate(voterId, candidateId, electionId);
        return res.status(201).json({message: vote.message});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
})

module.exports = voter;