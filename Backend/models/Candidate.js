const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    votes: { type: Number, default: 0 },
    party: { type: String },
    party_img: { type: String },
    img: { type: String },
    parent: {type: String},
    age: {type: Number },
    location: {type: String},
    self_profession: {type: String},
    spouse_profession: {type: String},
    assets: {type: String},
    liabilities: {type: String},
    educationa_details: {type: String},
    manifesto: {type: String}
});

module.exports = mongoose.model("Candidate", CandidateSchema);