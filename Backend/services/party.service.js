const { Party } = require("../models/index.js");
const { uploadFile, getFileStream } = require("../utils/uploadUtils.js");
const mongoose = require("mongoose");

// 📌 Service to Add a Party
const addParty = async (partyName, imageFile) => {
    if (!imageFile) {
        throw new Error("Image is required");
    }

    const imageId = await uploadFile(imageFile);
    console.log("Upload Finished: Image ID:", imageId);

    const newParty = new Party({
        partyName,
        partyImage: imageId,
    });

    const createdParty = await newParty.save();
    if (!createdParty) throw new Error("Uploading failed");

    return createdParty;
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

module.exports = { addParty, getPartyImage };
