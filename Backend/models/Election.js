const mongoose = require("mongoose");

const ElectionSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.ObjectId, required: true, ref: "Admin" },
    name: { type: String, required: true, unique: true },
    color: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    image: String
});

module.exports = mongoose.model("Election", ElectionSchema);