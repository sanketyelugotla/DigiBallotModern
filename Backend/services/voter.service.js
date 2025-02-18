const Vote = require('../models/Vote');
const Election = require('../models/Election');
const Candidate = require('../models/Candidate');
const User = require('../models/User');
const { Voter } = require('../models');

const voteCandidate = async (voterId, candidateId, electionId) => {
    try {
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
        return { message: "An error occurred while voting." };
    }
};

module.exports = {
    voteCandidate
}