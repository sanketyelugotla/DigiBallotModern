const { Party, Candidate } = require("../models/index.js");
const { uploadFile, getFileStream } = require("../utils/uploadUtils.js");
const mongoose = require("mongoose");

const getParties = async () => {
    console.log("first")
    const parties = await Party.find();
    if (!parties) {
        throw new Error("No parties found")
    }
    return parties;
}

const getParty = async (partyId) => {
    if (!mongoose.Types.ObjectId.isValid(partyId)) {
        throw new Error("Invalid partyId");
    }
    try {
        const party = await Party.findById(partyId);
        if (!party) {
            throw new Error("Error finding party");
        }
        return party;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching party");
    }
}

const getPartyByElectionId = async (electionId) => {
    try {
        const parties = await Party.find({ electionId: electionId });
        if (!parties) return [];
        return parties;
    } catch (error) {

    }
}

// 📌 Service to Add a Party
const addParty = async (electionId, adminId, state, partyName, imageFile) => {
    if (!imageFile) {
        throw new Error("Image is required");
    }
    const existing = await Party.findOne({ partyName });
    if (existing) throw new Error("Party already exists");
    const imageId = await uploadFile(imageFile);
    const newParty = new Party({
        electionId,
        adminId,
        state,
        partyName,
        partyImage: imageId
    });

    const createdParty = await newParty.save();
    if (!createdParty) throw new Error("Uploading failed");

    return createdParty;
};

const addCandidate = async (partyId, candidateId) => {
    if (!mongoose.Types.ObjectId.isValid(partyId)) {
        throw new Error("Invalid partyId");
    }
    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        throw new Error("Invalid candidateId");
    }

    try {
        const updatedParty = await Party.findByIdAndUpdate(
            { _id: partyId },
            { candidateId },
            { new: true, runValidators: true }
        );

        const updatedCandidate = await Candidate.findByIdAndUpdate(
            { _id: candidateId },
            { partyId: updatedParty._id },
            { new: true, runValidators: true }
        )


        if (!updatedParty) {
            throw new Error("Party not found");
        }

        return updatedParty;
    } catch (error) {
        console.error(error);
        throw new Error("Error adding candidate to party");
    }
};

// 📌 Service to Get Party Image
const getPartyImage = async (partyId) => {
    if (!mongoose.Types.ObjectId.isValid(partyId)) {
        throw new Error("Invalid Party ID");
    }

    const party = await Party.findById(partyId);
    if (!party || !party.partyImage) {
        throw new Error("Party or image not found");
    }

    return getFileStream(party.partyImage);
};

module.exports = { getParties, addParty, getPartyImage, addCandidate, getParty, getPartyByElectionId };
