const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    education: { type: String },
    age: { type: Number },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female"] },
    self_profession: { type: String },
    image: { type: String },
    state: { type: String },
    manifesto: { type: String },
    spouse: { type: String },
    spouse_profession: { type: String },
    liabilities: { type: String },
    assets: { type: String },
    elections: [
        {
            electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Elections" },
            electionType: { type: String },
            status: { type: String },
            partyId: { type: mongoose.Schema.Types.ObjectId, ref: "Parties" },
            party: { type: String }
        }
    ]
});

module.exports = mongoose.model("Candidate", CandidateSchema);