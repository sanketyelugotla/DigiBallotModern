const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    partyId: {type: mongoose.Schema.Types.ObjectId, ref: "Parties"},
    fullName: { type: String },
    email: { type: String },
    mobile: { type: String },
    education: { type: String },
    age: { type: Number },
    dob: {type: Date},
    gender: { type: String, enum: ["Male", "Female"] },
    self_profession: { type: String },
    image: { type: String },
    party: { type: String },
    state: {type: String},
    manifesto: { type: String },
    spouse: { type: String },
    spouse_profession: { type: String },
    liabilities: { type: String },
    assets: { type: String },
    votes: { type: Number, default: 0 }
});

module.exports = mongoose.model("Candidate", CandidateSchema);