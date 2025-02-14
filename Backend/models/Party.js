const mongoose = require("mongoose");

const PartySchema = new mongoose.Schema({
    partyName: { type: String, required: true },
    partyImage: { type: String }
});

module.exports = mongoose.model("Party", PartySchema);