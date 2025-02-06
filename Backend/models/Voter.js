const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hasVoted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Voter", VoterSchema)