const mongoose = require("mongoose");
const { Candidate } = require("../models/index.js");
const { uploadFile, getFileStream } = require("../utils/uploadUtils.js");

// 📌 Update Candidate Details
const updateCandidateDetails = async (userId, files, details) => {
    // if (!files.image || !files.manifesto) throw new Error("Both image and manifesto files are required");

    let imageId;
    let manifestoId;

    if (files.image) imageId = await uploadFile(files.image[0]);
    if (files.manifesto) manifestoId = await uploadFile(files.manifesto[0]);

    // console.log("Upload Finished: Image ID:", imageId, "Manifesto ID:", manifestoId);

    const updatedCandidate = await Candidate.findOneAndUpdate(
        { userId },
        {
            ...details,
            ...(details.profession && { self_profession: details.profession }),
            ...(imageId && { image: imageId }),
            ...(manifestoId && { manifesto: manifestoId }),
        },
        { new: true, runValidators: true }
    );
    if (!updatedCandidate) throw new Error("Candidate not found");
    return {
        candidate: updatedCandidate,
        fileIds: { image: imageId, manifesto: manifestoId },
    };
};

const getCandidates = async () => {
    const candidates = await Candidate.find().lean();
    return candidates.length ? candidates : [];
};

const getApprovedCandidates = async (electionId) => {
    const candidates = await Candidate.find({
        "elections._id": electionId,
        "elections.status": "approved"
    })
        .populate("elections._id", "name")
        .populate("elections.partyId", "partyName partyImage")
        .lean();

    return candidates.map(candidate => {
        const selectedElection = candidate.elections.find(e => e._id._id.toString() === electionId);
        console.log(selectedElection)
        return {
            ...candidate,
            election: selectedElection
        };
    });
};


const getCandidateDetails = async (candidateId) => {
    if (!mongoose.Types.ObjectId.isValid(candidateId)) throw new Error("Invalid candidateId");
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) throw new Error("Candidate not found");
    return candidate;
};

const getCandidateDetailsByUserId = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error("Invalid user ID");
    const candidate = await Candidate.findOne({ userId }).populate("elections._id").populate("elections.partyId")
    // console.log(candidate.elections)
    if (!candidate) throw new Error("Candidate not found");
    return candidate;
};

const getCandidateDetailsByuserId = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error("Invalid user ID");
    const candidate = await Candidate.findOne({ userId });
    // console.log(candidate.elections)
    if (!candidate) throw new Error("Candidate not found");
    return candidate;
};

// 📌 Fetch Candidate Image Separately
const getCandidateImageByCandidateId = async (userId = null, candidate = null) => {
    candidate = candidate || await getCandidateDetailsByUserId(userId);
    if (!candidate?.image) throw new Error("Candidate image not found");
    return getFileStream(candidate.image);
};

const getCandidateImageByUserId = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error("Invalid user ID");
    const candidate = await getCandidateDetailsByUserId(userId);
    return getFileStream(candidate.image);
}

const getCandidateImage = async (imageId) => {
    if (!mongoose.Types.ObjectId.isValid(imageId)) throw new Error("Invalid image ID");
    return getFileStream(imageId);
}

const registerForElection = async (user, electionId, partyId) => {
    try {
        const candidate = await getCandidateDetailsByuserId(user._id);
        if (!candidate) throw new Error("Candidate not found");

        const { electionService } = require("./index.js");
        const election = await electionService.getElectionById(electionId);
        if (!election) throw new Error("No election found");
        // Check if the candidate is already registered for this election
        const isAlreadyRegistered = candidate.elections.filter(e => e._id.toString() === electionId.toString());
        if (isAlreadyRegistered.length > 0) {
            if (isAlreadyRegistered[0].status === "pending") throw new Error("Please wait for admin approval");
            else if (isAlreadyRegistered[0].status === "approved") throw new Error("Already registered for this election");
        }

        // Add election registration entry
        candidate.elections.push({
            _id: electionId,
            electionType: election.electionType,
            status: "pending",
            partyId
        });

        await candidate.save();
        return { success: true, message: "Candidate registration request sent", candidate };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const isCandidateRegistered = async (candidateId, electionId) => {
    try {
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) throw new Error("Candidate not found");
        console.log(candidate)
        console.log(electionId)
        const isRegistered = candidate.elections.some(e => e._id.toString() === electionId.toString() && e.status === "approved");
        console.log(isRegistered)

        return { candidate, status: isRegistered };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = {
    updateCandidateDetails,
    getCandidateImage,
    getCandidates,
    getApprovedCandidates,
    getCandidateImageByCandidateId,
    getCandidateDetails,
    registerForElection,
    getCandidateDetailsByUserId,
    getCandidateDetailsByuserId,
    getCandidateImageByUserId,
    isCandidateRegistered
};
