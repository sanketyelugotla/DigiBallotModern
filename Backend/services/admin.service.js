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
        throw new Error(error);
    }
};

// ✅ Get candidates who have at least one pending election
const getPendingCandidates = async () => {
    try {
        const candidates = await Candidate.find({
            elections: { $elemMatch: { status: "pending" } }
        });

        return candidates.length ? candidates : [];
    } catch (error) {
        throw new Error(error);
    }
};

// ✅ Approve a specific candidate for a specific election
const approveCandidate = async (candidateId, electionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(candidateId)) throw new Error("Invalid candidate ID");
        if (!mongoose.Types.ObjectId.isValid(electionId)) throw new Error("Invalid election ID");

        const candidate = await Candidate.findOneAndUpdate(
            { _id: candidateId, "elections.electionId": electionId },
            { $set: { "elections.$.status": "approved" } },
            { new: true }
        );

        if (!candidate) throw new Error("Candidate or election not found");

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

        // Count votes for each candidate in the election
        const voteCounts = await Vote.aggregate([
            { $match: { electionId: new mongoose.Types.ObjectId(electionId) } },
            { $group: { _id: "$candidateId", votes: { $sum: 1 } } },
            { $sort: { votes: -1 } }
        ]);

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
