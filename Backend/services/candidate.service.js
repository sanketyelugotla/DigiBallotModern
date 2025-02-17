const mongoose = require("mongoose");
const { Candidate } = require("../models/index.js");
const { uploadFile, getFileStream } = require("../utils/uploadUtils.js");

// 📌 Update Candidate Details
const updateCandidateDetails = async (userId, files, details) => {
    if (!files.image || !files.manifesto) {
        throw new Error("Both image and manifesto files are required");
    }

    const imageId = await uploadFile(files.image[0]);
    const manifestoId = await uploadFile(files.manifesto[0]);

    console.log("Upload Finished: Image ID:", imageId, "Manifesto ID:", manifestoId);

    const updatedCandidate = await Candidate.findOneAndUpdate(
        { userId },
        {
            ...details,
            self_profession: details.profession,
            image: imageId,
            manifesto: manifestoId,
        },
        { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
        throw new Error("Candidate not found");
    }

    return {
        candidate: updatedCandidate,
        fileIds: { image: imageId, manifesto: manifestoId },
    };
};

// 📌 Get Candidate Image
const getCandidateImage = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }

    const candidate = await Candidate.findOne({ userId });
    if (!candidate || !candidate.image) {
        throw new Error("Candidate or image not found");
    }

    return getFileStream(candidate.image);
};

module.exports = { updateCandidateDetails, getCandidateImage };
