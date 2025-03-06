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
        const votes = await voterService.getVotes(req.params.electionId);
        return res.status(200).json({ message: "votes fetched successfylly", votes })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
})

voter.post("/register/:electionId", authenticate, async (req, res) => {
    try {
        const user = await voterService.registerForElection(req.user, req.params.electionId);
        if (!user.success) throw new Error(user.message);
        return res.status(201).json({ success: true, status: "pending", message: user.message })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
})

voter.get("/registeredElections", authenticate, async (req, res) => {
    try {
        const elections = await voterService.getRegisteredElections(req.user._id);
        if (!elections.success) throw new Error(elections.message);
        return res.status(201).json({ success: true, elections: elections.elections })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
})

module.exports = voter;