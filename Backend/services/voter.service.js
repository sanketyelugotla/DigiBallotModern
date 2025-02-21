const Vote = require('../models/Vote');
const mongoose = require("mongoose")
const { Voter, Election } = require('../models');

const getVoterIdFromUserId = async (userId) => {
    try {
        console.log(userId)
        if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error("Invalid userId");
        const voter = await Voter.findOne({userId});
        return voter._id;
    } catch (error) {
        console.error(error);
        return error;
    }
}

const voteCandidate = async (voterId, candidateId, electionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(voterId)) throw new Error("Invalid voterId");
        if (!mongoose.Types.ObjectId.isValid(candidateId)) throw new Error("Invalid candidateId");
        if (!mongoose.Types.ObjectId.isValid(electionId)) throw new Error("Invalid electionId");
        
        const { isElectionActive } = require("./election.service")
        const election = await isElectionActive(electionId)
        if (!election.status) throw new Error("Election is not active.");

        const voter = await Voter.findById(voterId);
        if (!voter) throw new Error("Voter not found or invalid.");

        const { isCandidateRegistered } = require("./candidate.service")
        const candidate = await isCandidateRegistered(candidateId, electionId);
        if (!candidate.status) throw new Error("Candidate not found in this election.");

        const existingVote = await Vote.findOne({ voterId, electionId });
        if (existingVote) throw new Error("You have already voted in this election.");

        const vote = new Vote({
            voterId,
            candidateId,
            electionId
        });
        await vote.save();
        return { message: "Vote successfully cast." };
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getVotes = async (electionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(electionId)) throw new Error("Invalid electionId");
        const election = await Election.findById(electionId);
        if (!election) throw new Error("Election not found");

        // Ensure the election is completed before declaring results
        // if (election.status !== "completed") throw new Error("Election is not yet completed");

        // Count votes for each candidate in the election
        const voteCounts = await Vote.aggregate([
            { $match: { electionId: new mongoose.Types.ObjectId(electionId) } },
            { $group: { _id: "$candidateId", votes: { $sum: 1 } } },
            { $sort: { votes: -1 } }
        ]);
        console.log(voteCounts)

        if (voteCounts.length === 0) throw new Error("No votes cast in this election");
        return voteCounts;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    voteCandidate,
    getVotes,
    getVoterIdFromUserId
}