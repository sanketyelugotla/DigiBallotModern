const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    elections: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true },
            status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
        }
    ]
});

module.exports = mongoose.model("Voter", VoterSchema)