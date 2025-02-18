const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
    voterId: { type: mongoose.Schema.Types.ObjectId, ref: "Voter", required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
    electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true }
});

module.exports = mongoose.model("Vote", VoteSchema);