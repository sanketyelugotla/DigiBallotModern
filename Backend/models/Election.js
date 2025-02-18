const mongoose = require("mongoose");

const ElectionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

module.exports = mongoose.model("Election", ElectionSchema);