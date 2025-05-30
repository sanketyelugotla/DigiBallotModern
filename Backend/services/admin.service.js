const { Election, Candidate, Voter, Vote, Admin, User } = require("../models");
const mongoose = require("mongoose");
const { uploadFile, getFileStream } = require("../utils/uploadUtils.js");
const bcrypt = require("bcryptjs");

const updateDetails = async (fullname, dob, email, gender, number, password, req) => {
    try {
        const id = req.user._id;

        let imageUrl = null;
        if (req.files && req.files.image) {
            const file = req.files.image[0];
            imageUrl = await uploadFile(file);
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const adminUpdate = { dob, gender, number };
        if (imageUrl) adminUpdate.image = imageUrl;

        const admin = await Admin.findOneAndUpdate(
            { userId: id },
            adminUpdate,
            { new: true, runValidators: true }
        );
        const userUpdate = { name: fullname, email };
        if (hashedPassword) userUpdate.password = hashedPassword;

        const user = await User.findByIdAndUpdate(
            id,
            userUpdate,
            { new: true, runValidators: true }
        );

        return { success: true, admin, user };
    } catch (error) {
        console.error("Error updating details:", error);
        throw new Error(error.message);
    }
};

const getDetails = async (req) => {
    try {
        const id = req.user._id;

        const user = await User.findById(id).select("name email");
        const admin = await Admin.findOne({ userId: id }).select("dob gender number image");

        if (!user || !admin) {
            return { success: false, message: "User not found" };
        }

        return {
            success: true,
            data: {
                _id: id,
                name: user.name,
                email: user.email,
                dob: admin.dob,
                gender: admin.gender,
                number: admin.number,
                image: admin.image
            }
        };
    } catch (error) {
        console.error("Error fetching details:", error);
        return { success: false, error: error.message };
    }
};

const createParty = async () => {

}

const addElection = async (name, startDate, endDate, color, userId, files) => {
    try {
        const existing = await Election.findOne({ name });
        if (existing) throw new Error("Election already exists");

        const imageId = await uploadFile(files.pic[0]);

        // Fetch the adminId from userId
        const user = await Admin.findOne({ userId });
        if (!user) throw new Error("Admin not found");
        const adminId = user._id;

        const newElection = new Election({
            name,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            color,
            adminId,
            image: imageId
        });

        await newElection.save();
        return newElection;
    } catch (error) {
        throw new Error(error.message || "Failed to create election");
    }
};

const getImage = async (imageId) => {
    if (!mongoose.Types.ObjectId.isValid(imageId)) throw new Error("Invalid image ID");
    return getFileStream(imageId);
}

// ✅ Get candidates who have at least one pending election
const getPendingCandidates = async () => {
    try {
        const candidates = await Candidate.find({
            "elections.status": "pending"
        })
            .populate("elections._id", "name")
            .populate("elections.partyId", "partyName"); // Fetch election name from Election schema

        // Flatten candidates so that each candidate-election pair is separate
        const expandedCandidates = candidates.flatMap(candidate =>
            candidate.elections
                .filter(election => election.status === "pending")
                .map(election => ({
                    _id: candidate._id, // Candidate ID
                    fullName: candidate.fullName,
                    email: candidate.email,
                    electionId: election._id?._id || election._id, // Ensure only the ObjectId is stored
                    electionName: election._id?.name || "Unknown", // Extract election name directly
                    status: election.status,
                    partyId: election.partyId._id,
                    partyName: election.partyId?.partyName
                }))
        );

        // console.log(expandedCandidates);
        return expandedCandidates;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch pending candidates");
    }
};

const getPendingUsers = async () => {
    try {
        const users = await Voter.find({
            "elections.status": "pending"
        })
            .populate("userId", "name") // Fetch user name from User schema
            .populate("elections._id", "name"); // Fetch election name from Election schema

        // Flatten users so that each user-election pair is separate
        const expandedUsers = users.flatMap(user =>
            user.elections
                .filter(election => election.status === "pending")
                .map(election => ({
                    _id: user._id, // User ID
                    name: user.userId?.name || "Unknown",
                    electionId: election._id?._id || election._id, // Ensure only the ObjectId is stored
                    electionName: election._id?.name || "Unknown", // Extract name directly
                    status: election.status
                }))
        );
        // console.log(expandedUsers)
        return expandedUsers;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch pending users");
    }
};

const getFilteredUsers = async ({ statuses, electionIds }) => {
    const query = {};

    if (statuses?.length) {
        query["elections.status"] = { $in: statuses };
    }

    if (electionIds?.length) {
        query["elections._id"] = { $in: electionIds };
    }

    const users = await Voter.find(query)
        .populate("userId", "name")
        .populate("elections._id", "name")
        // .populate("elections.partyId", "partyName");

    return users.flatMap(user =>
        user.elections
            .filter(election =>
                (!statuses?.length || statuses.includes(election.status)) &&
                (!electionIds?.length || electionIds.some(id => election._id.equals(id)))
            )
            .map(election => ({
                _id: user._id, // User ID
                name: user.userId?.name || "Unknown",
                electionId: election._id?._id || election._id, // Ensure only the ObjectId is stored
                electionName: election._id?.name || "Unknown", // Extract name directly
                status: election.status
            }))
    );
};

const getFilteredCandidates = async ({ statuses, electionIds }) => {
    const query = {};

    if (statuses?.length) {
        query["elections.status"] = { $in: statuses };
    }

    if (electionIds?.length) {
        query["elections._id"] = { $in: electionIds };
    }

    const candidates = await Candidate.find(query)
        .populate("elections._id", "name")
        .populate("elections.partyId", "partyName");

    return candidates.flatMap(candidate =>
        candidate.elections
            .filter(election =>
                (!statuses?.length || statuses.includes(election.status)) &&
                (!electionIds?.length || electionIds.some(id => election._id.equals(id)))
            )
            .map(election => ({
                _id: candidate._id, // Candidate ID
                fullName: candidate.fullName,
                email: candidate.email,
                electionId: election._id?._id || election._id, // Ensure only the ObjectId is stored
                electionName: election._id?.name || "Unknown", // Extract election name directly
                status: election.status,
                partyId: election.partyId._id,
                partyName: election.partyId?.partyName
            }))
    );
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
    updateDetails,
    getDetails,
    addElection,
    createParty,
    getImage,
    getPendingCandidates,
    approveCandidate,
    declareElection,
    getPendingUsers,
    approveCandidatesBulk,
    approveVoter,
    approveVotersBulk,
    getFilteredUsers,
    getFilteredCandidates
};
