const Vote = require("../models/Vote");
const mongoose = require("mongoose");
const { Voter, Election, User } = require("../models");

const getVoterIdFromUserId = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error("Invalid userId");
        const voter = await Voter.findOne({ userId });
        if (!voter) throw new Error("Voter not found");
        return voter._id;
    } catch (error) {
        console.error(error);
        return error;
    }
};

const voteCandidate = async (voterId, candidateId, electionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(voterId)) throw new Error("Invalid voterId");
        if (!mongoose.Types.ObjectId.isValid(candidateId)) throw new Error("Invalid candidateId");
        if (!mongoose.Types.ObjectId.isValid(electionId)) throw new Error("Invalid electionId");

        const { isElectionActive } = require("./election.service");
        const election = await isElectionActive(electionId);
        if (!election) throw new Error("Election is not active.");

        const voter = await Voter.findById(voterId);
        if (!voter) throw new Error("Voter not found.");

        const { isCandidateRegistered } = require("./candidate.service");
        const candidate = await isCandidateRegistered(candidateId, electionId);
        if (!candidate.status) throw new Error("Candidate not found in this election.");

        // Check if voter already voted in this election
        const existingVote = await Vote.findOne({ voterId, electionId });
        if (existingVote) throw new Error("You have already voted in this election.");

        // Cast vote
        const vote = new Vote({
            voterId,
            candidateId,
            electionId,
        });
        await vote.save();

        // Update voter elections list
        const index = voter.elections.findIndex(e => e._id.toString() === electionId);

        if (index !== -1) {
            voter.elections[index].status = "cast";
        } else {
            voter.elections.push({ _id: electionId, status: "cast" });
        }

        await voter.save();

        return { message: "Vote successfully cast" };
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

        // Count votes for each candidate in the election
        const voteCounts = await Vote.aggregate([
            { $match: { electionId: new mongoose.Types.ObjectId(electionId) } },
            { $group: { _id: "$candidateId", votes: { $sum: 1 } } },
            { $sort: { votes: -1 } },
        ]);

        if (voteCounts.length === 0) throw new Error("No votes cast in this election");
        return voteCounts;
    } catch (error) {
        throw new Error(error.message);
    }
};

const registerForElection = async (userId, electionId) => {
    try {
        const voter = await Voter.findOne({ userId });
        if (!voter) throw new Error("Voter not found");

        const { electionService } = require("./index.js");

        const election = await electionService.getElectionById(electionId);
        if (!election) throw new Error("No election found");

        // Ensure `elections` array is initialized
        if (!Array.isArray(voter.elections)) {
            voter.elections = [];
        }

        // Check if voter is already registered
        const existingRegistration = voter.elections.find(
            (e) => {
                return e._id.toString() === electionId
            }
        );
        if (existingRegistration?.status === "approved") {
            throw new Error("You are already registered for this election");
        }
        if (existingRegistration?.status === "pending") {
            throw new Error("Please wait for admin approval");
        }
        if (existingRegistration?.status === "cast") {
            throw new Error("Already cast an vote in this election");
        }

        // Push new election registration
        voter.elections.push({
            _id: new mongoose.Types.ObjectId(electionId),
            status: "pending",
        });


        voter.markModified("elections");
        await voter.save();


        return { success: true, message: "Voter registration request sent", voter };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
};

const getRegisteredElections = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error("Invalid userId");

        const voter = await Voter.findOne({ userId }).populate("elections.electionId");
        if (!voter) throw new Error("Voter not found");

        if (!voter.elections || voter.elections.length === 0) return { success: true, message: "No registered elections found", elections: [] };

        return { success: true, elections: voter.elections };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const isRegistered = async (userId, electionId) => {
    try {
        const voter = await Voter.findOne({ userId });

        if (!voter) return { status: false, message: "Voter not found" };
        if (!voter.elections || voter.elections.length === 0)
            return { status: false, message: "You are not registered for this election" };

        const election = voter.elections.find(e => e._id.toString() === electionId);
        if (!election) return { status: false, message: "You are not registered for this election" };
        if (election.status === "pending") return { status: false, message: "Approval pending from Admin" };
        if (election.status === "cast") return { status: false, message: "You already casted your vote in this election" };

        return { status: true, message: "Eligible to vote" };
    } catch (error) {
        return { status: false, message: error };
    }
};



module.exports = {
    voteCandidate,
    getVotes,
    getVoterIdFromUserId,
    registerForElection,
    getRegisteredElections,
    isRegistered
};
