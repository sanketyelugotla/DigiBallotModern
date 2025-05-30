const express = require("express");
const voter = express.Router();
const { voterService } = require("../services/index");

voter.post("/vote", async (req, res) => {
    const { candidateId, electionId } = req.body;
    try {
        const voterId = await voterService.getVoterIdFromUserId(req.user._id);
        const vote = await voterService.voteCandidate(voterId, candidateId, electionId);
        return res.status(201).json({ success: true, message: vote.message });
    } catch (error) {
        return res.status(500).json({ succcess: false, message: error.message })
    }
})

voter.post("/getVotes/:electionId", async (req, res) => {
    try {
        const votes = await voterService.getVotes(req.params.electionId);
        return res.status(200).json({ success: true, message: "votes fetched successfylly", votes })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message })
    }
})

voter.post("/getVotesWithDetails/:electionId", async (req, res) => {
    try {
        const votes = await voterService.getVotesWithCandidateDetails(req);
        return res.status(200).json({
            success: true,
            message: "Votes fetched successfully",
            votes
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

voter.post("/register/:electionId", async (req, res) => {
    try {
        const user = await voterService.registerForElection(req.user, req.params.electionId);
        if (!user.success) throw new Error(user.message);
        return res.status(201).json({ success: true, status: "pending", message: user.message })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })
    }
})

voter.get("/registeredElections", async (req, res) => {
    try {
        const elections = await voterService.getRegisteredElections(req.user._id);
        if (!elections.success) throw new Error(elections.message);
        return res.status(201).json({ success: true, elections: elections.elections })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
})

voter.post("/isEligible", async (req, res) => {
    try {
        const elections = await voterService.isRegistered(req.user._id, req.body.electionId);
        if (!elections.success) return res.status(400).json({ succcess: false, message: elections.message })
        return res.status(201).json({ success: true, message: elections.message })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ succcess: false, message: error })
    }
})

module.exports = voter;