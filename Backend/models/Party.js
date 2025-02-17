const mongoose = require("mongoose");

const PartySchema = new mongoose.Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    partyName: { type: String, required: true, unique: true },
    partyImage: { type: String }
});

module.exports = mongoose.model("Party", PartySchema);