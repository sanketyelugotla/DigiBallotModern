const { Election, Candidate, Voter, Vote } = require("../models");
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
            "elections.status": "pending" // Find candidates where at least one election has "pending" status
        });

        // Flatten candidates so that each candidate-election pair is separate
        const expandedCandidates = candidates.flatMap(candidate =>
            candidate.elections
                .filter(election => election.status === "pending") // Only keep pending elections
                .map(election => ({
                    _id: candidate._id, // Candidate ID
                    fullName: candidate.fullName, // Candidate Name
                    email: candidate.email, // Keep required fields only
                    party: candidate.party,
                    electionId: election._id, // Attach the specific election ID
                    status: election.status // Keep only the relevant election status
                }))
        );

        return expandedCandidates.length ? expandedCandidates : [];
    } catch (error) {
        throw new Error(error);
    }
};


const getPendingUsers = async () => {
    try {
        const users = await Voter.find({
            "elections.status": "pending" // Find users where at least one election has "pending" status
        }).populate("userId", "name"); // Fetch username from User schema

        // Flatten users so that each user-election pair is separate
        const expandedUsers = users.flatMap(user =>
            user.elections
                .filter(election => election.status === "pending") // Only keep pending elections
                .map(election => ({
                    _id: user._id, // User ID
                    name: user.userId?.name || "Unknown", // Fetch user name
                    email: user.email, // Keep required fields only
                    electionId: election._id, // Attach the specific election ID
                    status: election.status // Keep only the relevant election status
                }))
        );

        return expandedUsers.length ? expandedUsers : [];
    } catch (error) {
        throw new Error(error);
    }
};

const approveVoter = async (voterId, electionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(voterId)) throw new Error("Invalid voter ID");
        if (!mongoose.Types.ObjectId.isValid(electionId)) throw new Error("Invalid election ID");

        const voter = await Voter.findOneAndUpdate(
            { _id: voterId, "elections._id": electionId },
            { $set: { "elections.$.status": "approved" } },
            { new: true }
        );

        if (!voter) throw new Error("Voter or election not found");

        return voter;
    } catch (error) {
        throw new Error(error.message);
    }
};

const approveVotersBulk = async (voterIds, electionIds) => {
    try {
        // Validate input
        console.log(voterIds);
        console.log(electionIds);
        if (!voterIds || !Array.isArray(voterIds)) {
            throw new Error("Invalid voter IDs");
        }
        if (!electionIds || !Array.isArray(electionIds)) {
            throw new Error("Invalid election IDs");
        }
        if (voterIds.length !== electionIds.length) {
            throw new Error("Voter IDs and Election IDs must have the same length");
        }

        // Iterate through each voter and approve them for their respective election
        const results = [];
        for (let i = 0; i < voterIds.length; i++) {
            const voterId = voterIds[i];
            const electionId = electionIds[i];

            // Validate IDs
            if (!mongoose.Types.ObjectId.isValid(voterId)) {
                throw new Error(`Invalid voter ID: ${voterId}`);
            }
            if (!mongoose.Types.ObjectId.isValid(electionId)) {
                throw new Error(`Invalid election ID: ${electionId}`);
            }

            // Update the voter's election status
            const voter = await Voter.findOneAndUpdate(
                {
                    _id: voterId,
                    "elections._id": electionId
                },
                {
                    $set: { "elections.$.status": "approved" }
                },
                { new: true }
            );

            if (!voter) {
                throw new Error(`Voter or election not found for voterId: ${voterId}`);
            }

            results.push(voter);
        }

        return { success: true, message: `${results.length} voters approved`, results };
    } catch (error) {
        throw new Error(error.message);
    }
};



// ✅ Approve a specific candidate for a specific election
const approveCandidate = async (candidateId, electionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(candidateId)) throw new Error("Invalid candidate ID");
        if (!mongoose.Types.ObjectId.isValid(electionId)) throw new Error("Invalid election ID");

        const candidate = await Candidate.findOneAndUpdate(
            { _id: candidateId, "elections._id": electionId },
            { $set: { "elections.$.status": "approved" } },
            { new: true }
        );

        if (!candidate) throw new Error("Candidate or election not found");

        return candidate;
    } catch (error) {
        throw new Error(error.message);
    }
};

const approveCandidatesBulk = async (candidateIds, electionIds) => {
    try {
        // Validate input
        if (!candidateIds || !Array.isArray(candidateIds)) {
            throw new Error("Invalid candidate IDs");
        }
        if (!electionIds || !Array.isArray(electionIds)) {
            throw new Error("Invalid election IDs");
        }
        if (candidateIds.length !== electionIds.length) {
            throw new Error("Candidate IDs and Election IDs must have the same length");
        }

        // Iterate through each candidate and approve them for their respective election
        const results = [];
        for (let i = 0; i < candidateIds.length; i++) {
            const candidateId = candidateIds[i];
            const electionId = electionIds[i];
            console.log(candidateId);
            console.log(electionId);

            // Validate IDs
            if (!mongoose.Types.ObjectId.isValid(candidateId)) {
                throw new Error(`Invalid candidate ID: ${candidateId}`);
            }
            if (!mongoose.Types.ObjectId.isValid(electionId)) {
                throw new Error(`Invalid election ID: ${electionId}`);
            }

            // Update the candidate's election status
            const candidate = await Candidate.findOneAndUpdate(
                {
                    _id: candidateId,
                    "elections._id": electionId
                },
                {
                    $set: { "elections.$.status": "approved" }
                },
                { new: true }
            );

            const cand = await Candidate.findOne({ _id: candidateId, "elections.electionId": electionId });
            console.log(cand);


            if (!candidate) {
                throw new Error(`Candidate or election not found for candidateId: ${candidateId}`);
            }

            results.push(candidate);
        }

        return { success: true, message: `${results.length} candidates approved`, results };
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
    getPendingUsers,
    approveCandidatesBulk,
    approveVoter,
    approveVotersBulk
};
