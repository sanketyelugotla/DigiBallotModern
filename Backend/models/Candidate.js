const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    partyId: { type: mongoose.Schema.Types.ObjectId, ref: "Parties" },
    electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Elections" },
    electionStatus: { type: String },
    fullName: { type: String },
    email: { type: String },
    mobile: { type: String },
    education: { type: String },
    age: { type: Number },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female"] },
    self_profession: { type: String },
    image: { type: String },
    party: { type: String },
    state: { type: String },
    manifesto: { type: String },
    spouse: { type: String },
    spouse_profession: { type: String },
    liabilities: { type: String },
    assets: { type: String },
    candidateType: { type: String },
    elections: [
        {
            electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true },
            electionType: { type: String, required: true },
            status: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model("Candidate", CandidateSchema);