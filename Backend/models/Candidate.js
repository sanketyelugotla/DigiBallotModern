const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String },
    email: { type: String },
    mobileNumber: { type: String },
    gender: { type: String },
    votes: { type: Number, default: 0 },
    party: { type: String },
    party_img: { type: String },
    img: { type: String },
    parent: { type: String },
    age: { type: Number },
    location: { type: String },
    self_profession: { type: String },
    spouse_profession: { type: String },
    assets: { type: String },
    liabilities: { type: String },
    education: { type: String },
    manifesto: { type: String }
});

module.exports = mongoose.model("Candidate", CandidateSchema);