const { Election, Candidate, Vote } = require("../models");
const mongoose = require("mongoose");

const addElection = async (name, startDate, endDate) => {
    try {
        const existing = await Election.findOne({ name });
        if (existing) throw new Error("Election already exists");
        const newElection = new Election({
            name,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        });

        await newElection.save();
        return newElection;
    } catch (error) {
        throw new Error(error)
    }
};

const getPendingCandidates = async () => {
    try {
        const candidates = await Candidate.find({ electionStatus: "pending" });
        if (!candidates) return []
        return candidates;
    } catch (error) {
        throw new Error(error)
    }
}

const approveCandidate = async (candidateId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(candidateId)) throw new Error("Invalid candidate ID");
        const candidate = await Candidate.findByIdAndUpdate(
            candidateId,
            { electionStatus: "approved" },
            { new: true }
        );
        if (!candidate) throw new Error("Candidate not found or error approving candidate");
        return candidate;
    } catch (error) {
        throw new Error(error.message);
    }
};

const declareElection = async (electionId) => {
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

        const winner = await Candidate.findById(voteCounts[0]._id);
        if (!winner) throw new Error("Winner candidate not found");

        // Update the election with the winner
        election.winner = winner._id;
        await election.save();

        return { message: "Election declared successfully", winner };
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    addElection,
    getPendingCandidates,
    approveCandidate,
    declareElection,
};
