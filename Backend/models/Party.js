const mongoose = require("mongoose");

const PartySchema = new mongoose.Schema({
    partyName: { type: String, required: true, unique: true },
    partyImage: { type: String, required: true },
    state: { type: String },
    electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }
});

module.exports = mongoose.model("Party", PartySchema);