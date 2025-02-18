const { Election, Candidate } = require("../models");
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

module.exports = { addElection, getPendingCandidates, approveCandidate };
